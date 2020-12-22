import { BoardController } from './modules/board_controller.js'

/* global Stimulus */
const application = Stimulus.Application.start()
application.register('board', BoardController)
