import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import reducers, { namespace } from './states';

import { Themer } from './configuration/Themer';
import TranscriptInfoPanel from './components/TansciptInfoPanel/TranscriptInfoPanel';
import axios, { AxiosRequestConfig } from 'axios';

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

    // TODO: Update with customer logo URL
    flex.MainHeader.defaultProps.logoUrl = "https://www.probegroup.com.au/hs-fs/hubfs/PROBEcx_2021_logo.png?width=207&height=63&name=PROBEcx_2021_logo.png";

    // TODO: Update with customer colours
    const config = Themer.generateTheme({ lightText: '#FFFFFF', darkText: '#5936EC', background: '#D88738' });

    manager.updateConfig(config);

    // TODO: Update with customer name or similar
    manager.strings.NoTasks = "Probe IT";

    // Set width width to 400px, works well as a phone panel in an iFrame
    flex.AgentDesktopView.defaultProps.splitterOptions = { initialFirstPanelSize: "400px", minimumFirstPanelSize: "400px" };

    flex.AgentDesktopView.defaultProps.showPanel2 = false;
    flex.RootContainer.Content.remove("project-switcher");

    // Use our custom Info panel
    flex.TaskInfoPanel.Content.replace(<TranscriptInfoPanel key="TranscriptInfoPanel1" />);

    // Send messages to Freshservice
    // Show Flex when we are assigned a new task
    manager.workerClient.on("reservationCreated", function (reservation) {
      console.log('onReservationCreated: show softphone')
      window.parent.postMessage({ action: "show_softphone" }, '*');
    });

    // Screenpop Freshservice if we know the ticket number from Oration and it exists in Freshservice
    flex.Actions.addListener('afterAcceptTask', (payload) => {
      let ticketId = payload.task.attributes.orationrefNum;

      console.log(`onAfterAcceptTask - ticketId: ${ticketId}`);

      let screenpopValue = 'new'; // default is open new ticket screen

      // Check if ticket exists in Freshservice
      if (ticketId) {
        // Function base URL should probably be a task attribute
        const url = `https://freshservice-7858-dev.twil.io/getTicket?ticketId=${ticketId.trim()}`;

        const config: AxiosRequestConfig = {
          timeout: 2000
        };

        // Set screenpopValue to the ticket.id if it exists
        axios.get(url, config)
          .then(response => screenpopValue = response.data.id)
          .catch(reason => console.log('ticket not found', reason));
      }

      // Screenpop Freshservice
      console.log(`Freshservice screenpop ticket: ${screenpopValue}`);
      window.parent.postMessage({ action: "open_ticket", value: screenpopValue }, '*');
    });
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
