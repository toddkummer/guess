import {BoardController} from "./modules/board_controller.js"

const application = Stimulus.Application.start();
application.register("board", BoardController)
