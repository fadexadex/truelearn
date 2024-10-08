/**
 * file: src/index.ts
 * author: Samuel Emeka<@samthemogul>
 * First Modified: 02/09/24
 * Last Modified: 12/09/24
 */

import express from 'express'
import dotenv from 'dotenv'
import AppController from './app'
import { createServer } from 'http'
import { Server } from 'socket.io'
import SocketController from './api/v1/modules/chat/socket'
import 'reflect-metadata'
import logger from './libs/utils/logger/logger'

// const server = http.Server()
// CONFIGURE ENVIRONMENT VARIABLES
dotenv.config()

// Start Application Servers
export const app = express()


const PORT = process.env.PORT || 4000
const appController = new AppController(app, PORT)
const httpServer = appController.startApp()
export const io = new Server(httpServer)
io.on('connection', async (socket) => {
  logger.info(`user with id: ${socket.id} connected`)
  socket.on('disconnect', () => {
    logger.info(`user with id: ${socket.id} disconnected`)
  })
  const socketController = new SocketController(socket)
  await socketController.initializeMessaging()

})

