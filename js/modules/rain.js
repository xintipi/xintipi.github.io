// Import Lodash As Demo
import * as _ from 'lodash';
import COLORS from './color-library';

export default class Rain {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor() {
        this.COLOR_PALLETE = new COLORS();
        this.PALLETE_1 = this.COLOR_PALLETE.COLOR_PALLETE_2;
        this.RANDOM = 35;

        this.CANVAS = {
            width: stage.width,
            height: stage.height,
        }

        this.bindEvents();
    }


    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents() {
        this.InitDraw();

        this.DoRaining()
    }


    /* ===================================
     *  METHODS
     * =================================== */
    InitDraw() {
        // Draw Background
        this.background = new Rect(0, 0, this.CANVAS.width, this.CANVAS.height).addTo(stage).fill(this.PALLETE_1.left_1);

        // Draw Platform
        this.platform = new Rect(0, this.CANVAS.height - 100, stage.width, 100).addTo(stage);
        this.platform.fill(this.PALLETE_1.left_2);

        // Draw Building
    }

    DoRaining() {
        setInterval(() => {
            let randomX = Math.random() * this.CANVAS.width + 50;
            let dropTarget = {x: randomX - 70, y: this.CANVAS.height - 100 + Math.random() * 100}
            let rainDrop = new Rect(randomX, 0, 1, 20).fill(this.PALLETE_1.right_1).addTo(stage);
            rainDrop.animate('1.5s', dropTarget, {
                easing: 'easeIn',
                onEnd: () => {
                    rainDrop.destroy();
                    let waterEffect = new Ellipse(dropTarget.x, dropTarget.y, 5, 1)
                        .fill(this.PALLETE_1.right_1)
                        .addTo(stage)
                        .animate(new KeyframeAnimation('600ms', {
                            '0%': {opacity: 0, scale: 1},
                            '50%': {opacity: 0.6, scale: 2},
                            '100%': {opacity: 0.25, scale: 1.6}
                        }, {
                            easing: 'easeOut',
                            onEnd: () => {
                                waterEffect.destroy();
                            }
                        }));
                }
            });
        }, this.RANDOM);
    }
} 