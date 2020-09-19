(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _workbranch_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workbranch/game */ "./src/app/workbranch/game.ts");
/* harmony import */ var _workbranch_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workbranch/player */ "./src/app/workbranch/player.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var random__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! random */ "./node_modules/random/index.js");
/* harmony import */ var random__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(random__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");








const _c0 = function (a0) { return { "background-color": a0 }; };
function AppComponent_div_0_div_37_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tile_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, tile_r5.players[0].color));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", tile_r5.players.length, " ");
} }
const _c1 = function (a0) { return { "oldBestplayer": a0 }; };
function AppComponent_div_0_div_37_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_div_0_div_37_div_1_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const indexCol_r6 = ctx.index; const indexRow_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r9.setObjetive(indexRow_r3, indexCol_r6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AppComponent_div_0_div_37_div_1_div_2_Template, 2, 4, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tile_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, tile_r5.oldBestPlayer));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", tile_r5.players.length);
} }
function AppComponent_div_0_div_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppComponent_div_0_div_37_div_1_Template, 3, 4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", row_r2);
} }
function AppComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_div_0_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.startGame(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Start");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_div_0_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.stopGame(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Stop");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_div_0_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.setupGame(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Reset");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Total Players ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_div_0_Template_input_ngModelChange_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.totalPlayers = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Game Speed ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_div_0_Template_input_ngModelChange_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.game.speed = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Game timeout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_div_0_Template_input_ngModelChange_23_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r18.game.timeout = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "label", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Mutation Rate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_div_0_Template_input_ngModelChange_28_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.game.mutationRate = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, AppComponent_div_0_div_37_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.totalPlayers);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.totalPlayers, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.game.speed);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.game.speed, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.game.timeout);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.game.timeout, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.game.mutationRate);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.game.mutationRate);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("GEN: ", ctx_r0.game.round, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Time: ", ctx_r0.game.time, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.game.map);
} }
const api = "http://localhost:8081";
class AppComponent {
    constructor() {
        this.title = 'app';
        this.players1 = [];
        this.nextObjetive = [];
        this.minWeigth = -1;
        this.maxWeigth = 1;
        this.totalPlayers = 100;
        this.bluePositions = [
            [0, 0],
            [14, 14],
            [14, 0],
            [0, 14],
            [-1, -1]
        ];
        this.positionIndex = 0;
        this.oldPositionIndex = 0;
        this.oldPosition = [];
        this.setupGame();
    }
    setupGame() {
        if (this.game) {
            this.game.stop();
        }
        this.row = 15;
        this.col = 15;
        let design = [];
        for (let i = 0; i < this.row; i++) {
            design[i] = [];
            for (let j = 0; j < this.col; j++) {
                design[i][j] = 1;
            }
        }
        this.game = new _workbranch_game__WEBPACK_IMPORTED_MODULE_1__["default"](design);
    }
    stopGame() {
        this.game.stop();
    }
    startGame() {
        let initialPlayer = this.bestPlayer;
        if (!initialPlayer) {
            initialPlayer = this.createPlayer("red");
        }
        this.runGame(initialPlayer);
    }
    nextPositionPlayer2() {
        this.positionIndex++;
    }
    endGame(bestOldPlayer) {
        this.game.stop();
        let playersScore = [];
        if (this.hasWinner()) {
            this.nextPositionPlayer2();
            playersScore = this.players1.map(p => {
                return {
                    win: true,
                    player: p,
                    score: p.winTime
                };
            });
        }
        else {
            playersScore = [{
                    player: bestOldPlayer,
                    score: 1
                }];
        }
        playersScore.sort((a, b) => {
            return a.score - b.score;
        });
        this.bestPlayer = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.first(playersScore).player.fullCopy();
        this.clearListPlayer1();
        this.runGame(this.bestPlayer);
    }
    hasWinner() {
        return this.players1.some(player1 => player1.win);
    }
    createPlayer(color) {
        let player = new _workbranch_player__WEBPACK_IMPORTED_MODULE_2__["default"](color);
        player.setMapSize([this.game.map.length, this.game.map[0].length]);
        player.mutationRate = this.game.mutationRate;
        player.makeBrain();
        return player;
    }
    createListPlayer1(playerToCopy) {
        let listPlayers = [];
        for (let i = 0; i < this.totalPlayers; i++) {
            listPlayers.push(this.createPlayer(playerToCopy.color));
        }
        playerToCopy.brain.dispose();
        this.players1 = listPlayers;
        return this.players1;
    }
    clearListPlayer1() {
        if (this.players1 && this.players1.length) {
            this.players1.forEach(player1 => player1.brain.dispose());
        }
        this.players1 = [];
    }
    hasBestPlayer(players) {
        return (players || []).some(player => player.oldBestPlayer);
    }
    setObjetive(row, col) {
        this.nextObjetive = [col, row];
    }
    debugPlayer() {
        this.debug = !this.debug;
    }
    getRandomPosition() {
        return Math.round(random__WEBPACK_IMPORTED_MODULE_4__["uniform"](0, (this.game.map.length - 1))());
    }
    getNextPositionPlayer2() {
        let player2Position = this.bluePositions[this.positionIndex < 4 ? this.positionIndex : 4];
        // random mode
        if (player2Position[0] == -1 && player2Position[1] == -1) {
            player2Position = null;
            if (this.positionIndex != this.oldPositionIndex) {
                this.oldPositionIndex = this.positionIndex;
                player2Position = [
                    this.getRandomPosition(),
                    this.getRandomPosition()
                ];
            }
        }
        if (!player2Position) {
            player2Position = this.oldPosition;
        }
        if (typeof this.nextObjetive[0] != "undefined") {
            player2Position[0] = this.nextObjetive[0];
        }
        if (typeof this.nextObjetive[1] != "undefined") {
            player2Position[1] = this.nextObjetive[1];
        }
        this.oldPosition = player2Position;
        return player2Position;
    }
    createPlayer2() {
        if (this.player2)
            this.player2.brain.dispose();
        this.player2 = this.createPlayer("blue");
        return this.player2;
    }
    runGame(bestPlayer) {
        this.game.resetGame();
        let player2 = this.createPlayer2();
        let player2Position = this.getNextPositionPlayer2();
        this.game.newPlayer(player2, player2Position);
        this.game.setObjetive(player2);
        if (bestPlayer.position) {
            this.game.setOldBestPlayerPosition(bestPlayer.position);
        }
        let players1 = this.createListPlayer1(bestPlayer.fullCopy());
        for (let player1 of players1) {
            this.game.newPlayer(player1, [7, 7]);
        }
        this.game.start(() => {
            // frame (1 second)
            for (let player of this.players1) {
                if (player.win) {
                    this.endGame(player);
                    break;
                }
                let keyPress = player.predictMovement(this.game.getAdjacentsTiles(player.position));
                if (keyPress) {
                    player.movement(keyPress);
                }
            }
            if (this.player2.lose === false) {
                // let keyPress = player2.predictRunner(this.game.getAdjacents(player2.position));
                // player2.movement(player2.randomMoment());
            }
            let bkpPlayer = this.players1[0].fullCopy();
            this.players1 = this.players1.filter(player => {
                return player.lose === false;
            });
            if (!this.players1.length) {
                this.players1.push(bkpPlayer);
                return this.endGame(bestPlayer);
            }
        }, () => this.endGame(bestPlayer));
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 1, consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "row"], [1, "col-lg-12"], [1, "btn", "btn-success", 2, "margin", "10px", 3, "click"], [1, "btn", "btn-danger", 2, "margin", "10px", 3, "click"], [1, "btn", "btn-warning", 2, "margin", "10px", 3, "click"], ["for", "totalPlayers"], ["type", "range", "name", "totalPlayers", "max", "500", "min", "1", 3, "ngModel", "ngModelChange"], ["for", "gameSpeed"], ["type", "range", "name", "gameSpeed", "max", "1000", "min", "3", 3, "ngModel", "ngModelChange"], ["for", "timeout"], ["type", "range", "name", "timeout", "max", "50", "min", "10", 3, "ngModel", "ngModelChange"], [1, "form-group"], ["for", "MutationRate"], ["type", "range", "name", "mutationRate", "min", "0", "max", "1", "step", "0.01", 1, "form-control", 3, "ngModel", "ngModelChange"], ["class", "row", 4, "ngFor", "ngForOf"], ["class", "column", 4, "ngFor", "ngForOf"], [1, "column"], [1, "tile", 2, "cursor", "pointer", 3, "ngClass", "click"], ["class", "player", "style", "color: white; font-weight: bold; text-align: center;", 3, "ngStyle", 4, "ngIf"], [1, "player", 2, "color", "white", "font-weight", "bold", "text-align", "center", 3, "ngStyle"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AppComponent_div_0_Template, 38, 11, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.game);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RangeValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgStyle"]], styles: [".row[_ngcontent-%COMP%]   .column[_ngcontent-%COMP%] {\n  margin: 1px;\n  display: inline-block;\n}\n.row[_ngcontent-%COMP%]   .column[_ngcontent-%COMP%]   .tile[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  background-color: white;\n  width: 30px;\n  height: 30px;\n  border: 1px solid grey;\n}\n.row[_ngcontent-%COMP%]   .column[_ngcontent-%COMP%]   .tile.oldBestplayer[_ngcontent-%COMP%] {\n  background-color: green;\n}\n.row[_ngcontent-%COMP%]   .column[_ngcontent-%COMP%]   .tile[_ngcontent-%COMP%]   .player[_ngcontent-%COMP%] {\n  position: absolute;\n  margin: 5px;\n  width: 20px;\n  height: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxXQUFBO0VBQ0EscUJBQUE7QUFBSjtBQUNJO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0FBQ047QUFDTTtFQUNFLHVCQUFBO0FBQ1I7QUFDTTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQ1IiLCJmaWxlIjoic3JjL2FwcC9hcHAuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yb3d7XHJcbiAgLmNvbHVtbntcclxuICAgIG1hcmdpbjogMXB4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyAgXHJcbiAgICAudGlsZXtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyZXk7XHJcblxyXG4gICAgICAmLm9sZEJlc3RwbGF5ZXJ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XHJcbiAgICAgIH1cclxuICAgICAgLnBsYXllciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIG1hcmdpbjogNXB4O1xyXG4gICAgICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: "app.html",
                styleUrls: ["app.scss"]
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
                ],
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/workbranch/game.ts":
/*!************************************!*\
  !*** ./src/app/workbranch/game.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

class Game {
    constructor(designMap) {
        this.designMap = designMap;
        this.mapPlayers = [];
        this.status = "waiting";
        this.end = false;
        this.time = 0;
        this.round = 0;
        this.timeout = 20;
        this.speed = 200;
        this.mutationRate = 0.1;
        this.resetGame();
    }
    resetGame() {
        this.time = 0;
        this.round++;
        this.mapPlayers = [];
        this.map = this.designMap.map((row, indexRow) => {
            return row.map((column, indexColumn) => {
                return {
                    players: [],
                    oldBestPlayer: false
                };
            });
        });
    }
    gameOver(status) {
        this.stop();
        this.status = status;
        this.end = true;
        this.resetGame();
    }
    setObjetive(player) {
        player.iAmObjetive = true;
        this.mapPlayers.forEach(_player => _player.setObjetive(player.row, player.col));
        this.objetive = player;
    }
    getAdjacentsTiles([row, col]) {
        let adjacent = [
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(this.map, `${row - 1}.${col}`, false),
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(this.map, `${row + 1}.${col}`, false),
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(this.map, `${row}.${col - 1}`, false),
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(this.map, `${row}.${col + 1}`, false),
        ];
        return adjacent.map(map => {
            return map ? 1 : 0;
        });
    }
    getRowCol([row, col]) {
        if (this.positionOnMap([row, col]) === false) {
            throw new Error(`out map ${row} - ${col}`);
        }
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.map, `${row}.${col}`);
    }
    positionOnMap([row, col]) {
        return !!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(this.map, `${row}.${col}`);
    }
    newPlayer(player, [row, col]) {
        if (this.positionOnMap([row, col]) === false) {
            throw new Error(`out map ${player.row} - ${player.col}`);
        }
        this.setPositionOnPlayer(player, [row, col]);
        if (!player.iAmObjetive && this.objetive) {
            player.setObjetive(this.objetive.row, this.objetive.col);
        }
        this.mapPlayers.push(player);
        // implemente movemento for player
        player.movement = (keyPress) => this.movement(player, keyPress);
        this.putPlayerOnMap(player);
    }
    setPositionOnPlayer(player, [row, col]) {
        player.position = [row, col];
    }
    hitOtherPlayer(players, player) {
        return players.some(_player => _player.color != player.color);
    }
    putPlayerOnMap(player) {
        let { players } = this.getRowCol(player.position);
        players.push(player);
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.map, `${player.row}.${player.col}`, { players });
        this.checkWinLose(player);
    }
    checkWinLose(player) {
        let { players } = this.getRowCol(player.position);
        let hit = this.hitOtherPlayer(players, player);
        if (hit) {
            if (player.iAmObjetive) {
                player.lose = true;
            }
            else {
                player.win = true;
                this.objetive.lose = true;
                player.winTime = this.time;
            }
        }
    }
    getAdjacentsPlayers([row, col]) {
        let position1 = row - 1 >= 0 ? this.getRowCol([row - 1, col]) : [];
        let position2 = row + 1 <= this.map.length ? this.getRowCol([row + 1, col]) : [];
        let position3 = col - 1 >= 0 ? this.getRowCol([row, col - 1]) : [];
        let position4 = col + 1 <= this.map[0].length ? this.getRowCol([row, col + 1]) : [];
        let adjacent = [
            position1.length,
            position2.length,
            position3.length,
            position4.length,
        ];
        return adjacent.map(_number => {
            return typeof _number != "undefined" ? _number : 0;
        }).map(_number => {
            return _number > 0 ? 1 : 0;
        });
    }
    setOldBestPlayerPosition([row, col]) {
        let tile = this.getRowCol([row, col]);
        tile.oldBestPlayer = true;
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.map, `${row}.${col}`, tile);
    }
    movement(player, keyPress) {
        let movement = {
            "ArrowUp": { row: player.row - 1 },
            "ArrowDown": { row: player.row + 1 },
            "ArrowLeft": { col: player.col - 1 },
            "ArrowRight": { col: player.col + 1 }
        };
        let { row, col } = movement[keyPress];
        if (typeof row == "undefined")
            row = player.row;
        if (typeof col == "undefined")
            col = player.col;
        if (this.positionOnMap([row, col]) === false) {
            // try move out map !!!!
            // lose ?
            return false;
        }
        this.updateMapPositionPlayer(player, [row, col]);
    }
    updateMapPositionPlayer(player, [row, col]) {
        let tile = this.getRowCol(player.position);
        tile.players = tile.players.filter(_player => _player != player);
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.set(this.map, `${player.row}.${player.col}`, tile);
        this.mapPlayers = this.mapPlayers.filter(_player => _player != player);
        this.setPositionOnPlayer(player, [row, col]);
        this.mapPlayers.push(player);
        this.putPlayerOnMap(player);
    }
    start(frameUpdate, endFn) {
        let speed = this.speed;
        this.interval = setInterval(() => {
            if (speed != this.speed) {
                clearInterval(this.interval);
                return this.start(frameUpdate, endFn);
            }
            this.nextStep(frameUpdate, endFn);
        }, speed);
    }
    stop() {
        if (this.interval)
            clearInterval(this.interval);
    }
    nextStep(frameUpdate, endFn) {
        this.time++;
        frameUpdate();
        if (this.time > this.timeout) {
            this.gameOver("timeout");
            return endFn();
        }
    }
}


/***/ }),

/***/ "./src/app/workbranch/nn.ts":
/*!**********************************!*\
  !*** ./src/app/workbranch/nn.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NeuralNetwork; });
/* harmony import */ var _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js");

// @ts-ignore
window.tf = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__;
// tf.setBackend('cpu');
const INPUTS = 4;
const NODES = 64;
const OUTPUTS = 4;
class NeuralNetwork {
    constructor(nn) {
        if (nn) {
            this.model = nn;
        }
        else {
            this.model = NeuralNetwork.createModel();
        }
    }
    static createModel() {
        const model = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["sequential"]();
        let inputlayer = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["layers"].dense({
            inputShape: [INPUTS],
            units: NODES,
            activation: 'sigmoid'
        });
        let hiddenlayers = [];
        let totalHiddenLayer = 16;
        let nodes = NODES;
        for (let i = 0; i < totalHiddenLayer; i++) {
            hiddenlayers.push(_tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["layers"].dense({
                units: nodes,
                activation: 'relu'
            }));
        }
        let outputLayer = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["layers"].dense({
            units: OUTPUTS,
            activation: 'sigmoid'
        });
        model.add(inputlayer);
        hiddenlayers.forEach(layer => model.add(layer));
        model.add(outputLayer);
        model.compile({ optimizer: "adam", loss: _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["losses"].sigmoidCrossEntropy, metrics: 'accuracy' });
        return model;
    }
    dispose() {
        this.model.dispose();
    }
    copy() {
        // @ts-ignore
        return _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["tidy"](() => {
            const modelCopy = NeuralNetwork.createModel();
            const w = this.model.getWeights();
            for (let i = 0; i < w.length; i++) {
                w[i] = w[i].clone();
            }
            modelCopy.setWeights(w);
            const nn = new NeuralNetwork(modelCopy);
            return nn;
        });
    }
    mutate(func) {
        _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["tidy"](() => {
            const w = this.model.getWeights();
            for (let i = 0; i < w.length; i++) {
                let shape = w[i].shape;
                let arr = w[i].dataSync().slice();
                for (let j = 0; j < arr.length; j++) {
                    arr[j] = func(arr[j]);
                }
                let newW = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["tensor"](arr, shape);
                w[i] = newW;
            }
            this.model.setWeights(w);
        });
    }
    predict(input_array) {
        // console.log(input_array);
        return _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["tidy"](() => {
            let xs = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__["tensor"]([input_array]);
            let ys = this.model.predict(xs);
            // @ts-ignore
            let y_values = ys.dataSync();
            return y_values;
        });
    }
}


/***/ }),

/***/ "./src/app/workbranch/player.ts":
/*!**************************************!*\
  !*** ./src/app/workbranch/player.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _nn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nn */ "./src/app/workbranch/nn.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mathjs */ "./node_modules/mathjs/main/esm/index.js");
/* harmony import */ var random__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! random */ "./node_modules/random/index.js");
/* harmony import */ var random__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(random__WEBPACK_IMPORTED_MODULE_3__);




function randomG(v) {
    var r = 0;
    for (var i = v; i > 0; i--) {
        r += Math.random();
    }
    return r / v;
}
function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
}
;
/*
  https://p5js.org/reference/#/p5/map
*/
function map(n, start1, stop1, start2, stop2, withinBounds) {
    var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newval;
    }
    if (start2 < stop2) {
        return constrain(newval, start2, stop2);
    }
    else {
        return constrain(newval, stop2, start2);
    }
}
;
class Player {
    constructor(color) {
        this.id = Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v1"])();
        this.lastBestScore = 1000;
        this.lose = false;
        this.win = false;
        this.iAmObjetive = false;
        this.mutationRate = 0.1;
        this.debug = false;
        this.maxWeigth = 1;
        this.minWeigth = -1;
        this.oldBestPlayer = false;
        this.color = color;
    }
    setMapSize(mapSize) {
        this.mapSize = mapSize;
    }
    get row() {
        return this.position[0];
    }
    set row(value) {
        this.position[0] = value;
    }
    get col() {
        return this.position[1];
    }
    set col(value) {
        this.position[1] = value;
    }
    makeBrain(brain, opt) {
        let { ignoreMutation = false } = opt || {};
        if (brain) {
            // @ts-ignore
            this.brain = brain.copy();
            if (!ignoreMutation) {
                this.mutation();
            }
        }
        else {
            this.brain = new _nn__WEBPACK_IMPORTED_MODULE_0__["default"]();
        }
    }
    setObjetive(row, col) {
        this.objetive = [row, col];
    }
    movement(keyPress) {
        throw new Error("not implemented");
    }
    setMutation(mutation) {
        this.mutationRate = mutation;
    }
    mutation() {
        this.brain.mutate((value) => {
            if (this.mutationRate != 0 && Object(mathjs__WEBPACK_IMPORTED_MODULE_2__["random"])(0, 1) <= this.mutationRate) {
                let _value = value + random__WEBPACK_IMPORTED_MODULE_3__["uniform"](this.minWeigth, this.maxWeigth)();
                return _value;
            }
            else {
                return value;
            }
        });
        if (this.debug)
            this.debug = false;
    }
    fullCopy() {
        return this.copy({ ignoreMutation: true });
    }
    copy(opt) {
        let { mutationRate, debug, minWeigth, maxWeigth, ignoreMutation } = opt || {};
        let player = new Player(this.color);
        player.setMapSize(this.mapSize);
        player.mutationRate = mutationRate;
        player.debug = debug;
        if (typeof minWeigth != "undefined") {
            player.minWeigth = minWeigth;
        }
        if (typeof maxWeigth != "undefined") {
            player.maxWeigth = maxWeigth;
        }
        player.makeBrain(this.brain, { ignoreMutation });
        return player;
    }
    randomMovement() {
        let movement = [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ];
        return movement[Math.round(Math.random() * 3)];
    }
    predictMovement(adjacent) {
        let inputs = [];
        let [y, x] = this.position;
        let [y2, x2] = this.objetive;
        let diffx = Math.pow((x - x2), 2);
        let diffy = Math.pow((y - y2), 2);
        let score = diffx + diffy;
        if (this.lastBestScore > score) {
            this.lastBestScore = score;
        }
        const maxDistance = Math.sqrt(Math.pow(15, 2) + Math.pow(15, 2));
        inputs[0] = map(x, 0, this.mapSize[0], 0, 1);
        inputs[1] = map(y, 0, this.mapSize[0], 0, 1);
        inputs[2] = map(x2, 0, this.mapSize[0], 0, 1);
        inputs[3] = map(y2, 0, this.mapSize[1], 0, 1);
        // inputs[4] = adjacent[0]; // 0 || 1
        // inputs[5] = adjacent[1]; // 0 || 1
        // inputs[6] = adjacent[2]; // 0 || 1
        // inputs[7] = adjacent[3]; // 0 || 1
        // inputs[4] = map(Math.sqrt(diffx + diffy), 0, maxDistance, 0, 1);
        // inputs[5] = map(Math.abs(x - x2), 0, this.mapSize[0], 0, 1);
        // inputs[6] = map(Math.abs(y - y2), 0, this.mapSize[1], 0, 1);
        let action = this.brain.predict(inputs);
        console.log("action = " + action);
        let max = -Infinity;
        action.forEach(moveValue => {
            if (moveValue > max) {
                max = moveValue;
            }
        });
        let movement = [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ];
        let indexArr = action.indexOf(max);
        if (indexArr == 4) {
            return "";
        }
        return movement[indexArr];
    }
}


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\marko\code\tensorflow-study\app\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!****************************!*\
  !*** node-fetch (ignored) ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!********************************!*\
  !*** string_decoder (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map