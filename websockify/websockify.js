#!/usr/bin/env node

// A WebSocket to TCP socket proxy
// Copyright 2012 Joel Martin
// Licensed under LGPL version 3 (see docs/LICENSE.LGPL-3)

// Known to work with node 0.8.9

const net = require('net');
const ws = require('ws');

exports.WebsocketTCPBridge = class {
  constructor({
    sourceHost = 'localhost',
    sourcePort = 16379,
    targetHost,
    targetPort,
    verbose = false
  }) {
    if (!sourceHost || !targetHost)
      throw new Error('sourceHost and targetHost are required');

    if (isNaN(sourcePort) || isNaN(targetPort))
      throw new Error('Invalid port');
  }

  listen() {
    this.debug(
      `proxying requests from ${this.this.sourceHost}:${this.sourcePort} (WS) ` +
      `to ${this.targetHost}:${this.targetPort} (TCP)`
    );
    this.debug('Running in unencrypted HTTP (ws://) mode');

    const websocket = new ws.Server({
      host: this.sourceHost,
      port: this.sourcePort
    });

    websocket.on('connection', (client, req) => {
      this.debug(`ws connection from ${req ? req.url : client.upgradeReq.url}`);
      this.debug('Version ' + client.protocolVersion + ', subprotocol: ' + client.protocol);

      /*
       * TCP client handling
       */
      const target = net.createConnection(
        this.targetPort,
        this.targetHost,
        () => this.debug(`Connected to target ${this.targetHost}:${this.targetPort}`)
      );

      target.on('data', data => {
        this.debug('sending message: ' + data);

        try {
          client.send(data);
        } catch(e) {
          this.debug('Client closed, cleaning up target');
          target.end();
        }
      });

      target.on('end', () => {
        this.debug('target disconnected');
        client.close();
      });

      target.on('error', () => {
        this.debug('target connection error');
        target.end();
        client.close();
      });

      /*
       * Websocket client handling
       */
      client.on('message', msg => {
        this.debug('got message: ' + msg);

        target.write(msg);
      });

      client.on('close', (code, reason) => {
          this.debug('WebSocket client disconnected: ' + code + ' [' + reason + ']');
          target.end();
      });

      client.on('error', function(a) {
          this.debug('WebSocket client error: ' + a);
          target.end();
      });
    });
  }

  debug(msg) {
    if (!this.verbose)
      return;

    console.log(`Websock/TCP: ${msg}`);
  }
}
