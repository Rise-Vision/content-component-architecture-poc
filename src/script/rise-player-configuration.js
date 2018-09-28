"use strict";

var RisePlayerConfiguration = {
  ComponentLoader: null,
  configure: function configure(playerInfo, localMessagingInfo) {

    if (!RisePlayerConfiguration.LocalMessaging) {
      throw new Error("RiseLocalMessaging script was not loaded");
    }

    RisePlayerConfiguration.LocalMessaging.configure(localMessagingInfo);

    //TODO: other processing

    // lock down RisePlayerConfiguration object
    Object.freeze(RisePlayerConfiguration);
  },
  LocalMessaging: null,
  Logger: null
};