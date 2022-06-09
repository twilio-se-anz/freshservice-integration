import React, { Component } from 'react'
import { TaskContextProps, withTaskContext } from '@twilio/flex-ui';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <TimerIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant='overline' color="textPrimary">
                    Time in Queue
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography variant='caption' color="textSecondary">
                    2 minutes
                  </Typography>
                </React.Fragment>}
            />
          </ListItem>
          <Divider inset />
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <BugReportIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant='overline' color="textPrimary">
                    Ticket Number
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography variant='caption' color="textSecondary">
                    {task?.attributes.refNum || 'Ticket number unknown'}
                  </Typography>
                </React.Fragment>}
            />
          </ListItem>
          <Divider inset />
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <InputIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant='overline' color="textPrimary">
                    Input method
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography variant='caption' color="textSecondary">
                    Voice Recognition
                  </Typography>
                </React.Fragment>}
            />
          </ListItem>
          <Divider inset />
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <QueueIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant='overline' color="textPrimary">
                    Queue Requested
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography variant='caption' color="textSecondary">
                    {task?.attributes.topic || 'Queue unknown'}
                  </Typography>
                </React.Fragment>}
            />
          </ListItem>
          <Divider inset />
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <RecordVoiceOverIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant='overline' color="textPrimary">
                    Transcript
                  </Typography>
                </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography variant='caption' color="textSecondary">
                    {task?.attributes.transcript || 'Transcript not available'}
                  </Typography>
                </React.Fragment>}
            />
          </ListItem>
        </List>
      </>
    )
  }
}

export default withTaskContext(TranscriptInfoPanel);