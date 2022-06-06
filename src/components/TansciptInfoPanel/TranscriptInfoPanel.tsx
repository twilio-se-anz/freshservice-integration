import React, { Component } from 'react'
import { TaskContextProps, withTaskContext } from '@twilio/flex-ui';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import TimerIcon from '@material-ui/icons/Timer';
import QueueIcon from '@material-ui/icons/Queue';
import BugReportIcon from '@material-ui/icons/BugReport';
import InputIcon from '@material-ui/icons/Input';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

class TranscriptInfoPanel extends Component<unknown> {

  constructor(props: unknown) {
    super(props);
  }

  render() {
    const { task } = this.props as TaskContextProps;

    return (
      <>
        <List >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <TimerIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Time in Queue" secondary="2 minutes" />
          </ListItem>
          <Divider inset />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BugReportIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Ticket Number" secondary={task?.attributes.refNum || 'Ticket number unknown'} />
          </ListItem>
          <Divider inset />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <InputIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Input Method" secondary="Voice Recognition" />
          </ListItem>
          <Divider inset />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <QueueIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Queue Requested" secondary="Escalation" />
          </ListItem>
          <Divider inset />
          <ListItem  >
            <ListItemAvatar>
              <Avatar>
                <RecordVoiceOverIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Transcript" secondary={task?.attributes.transcript || 'Transcript not available'} />
          </ListItem>
        </List>

        <div>{task?.attributes.refNum}</div>
        <div>{task?.attributes.topic}</div>
        <div>{task?.attributes.transcript}</div>
      </>


    )
  }
}

export default withTaskContext(TranscriptInfoPanel);