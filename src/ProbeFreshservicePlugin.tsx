import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import reducers, { namespace } from './states';

import { Themer } from './configuration/Themer';
import TranscriptInfoPanel from './components/TansciptInfoPanel/TranscriptInfoPanel';
import { ReservationStatuses } from '@twilio/flex-ui';

const PLUGIN_NAME = 'ProbeFreshservicePlugin';

export default class ProbeFreshservicePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    this.registerReducers(manager);

    manager.workerClient.on("reservationCreated", (reservation: TaskRouter.Reservation) => {
      console.log(reservation);
      // axios.get(twilio function, callSid)
      // save it to pass to new info panel
    })

    // TODO: Update with customer logo URL
    flex.MainHeader.defaultProps.logoUrl = "https://cataas.com/cat";

    // TODO: Update with customer colours
    const config = Themer.generateTheme({ lightText: '#FFFFFF', darkText: '#001489', background: '#F22F46' });

    manager.updateConfig(config);

    // TODO: Update with customer name or similar
    manager.strings.NoTasks = "Nothing to see here";

    flex.AgentDesktopView.defaultProps.splitterOptions = { initialFirstPanelSize: "400px", minimumFirstPanelSize: "400px" };

    flex.AgentDesktopView.defaultProps.showPanel2 = false;

    flex.TaskInfoPanel.Content.replace(<TranscriptInfoPanel key="TranscriptInfoPanel1" />);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
