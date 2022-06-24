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
    let transcription: string[] | null = null;

    // Transform the transcription if there is one
    if (task?.attributes.orationTranscript) {
      // Transcription is a string of responses separated by pipe. i.e.: 'can't connect to network | sydney'
      const rawPhrases: string[] = task?.attributes.orationTranscript.split('|');

      // Strip the spaces, upper the first letter, add full stop.
      transcription = rawPhrases.map(phrase => {
        let tmpPhrase = phrase.trim();
        return tmpPhrase.charAt(0).toUpperCase() + tmpPhrase.slice(1) + '.';
      });
    }

    return (
      <>
        <List >
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <BugReportIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant='overline' color="textPrimary">
                    Ticket Number
                  </Typography>
                </>}
              secondary={
                <>
                  <Typography variant='caption' color="textSecondary">
                    {task?.attributes.orationrefNum || 'Ticket number unknown'}
                  </Typography>
                </>}
            />
          </ListItem>
          <Divider variant='inset' />

          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <InputIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant='overline' color="textPrimary">
                    Input method
                  </Typography>
                </>}
              secondary={
                <>
                  <Typography variant='caption' color="textSecondary">
                    {task?.attributes.orationHandler === "TRUE" ? "Voice Recognition" : "Keypad"}
                  </Typography>
                </>}
            />
          </ListItem>
          <Divider variant='inset' />

          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <QueueIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant='overline' color="textPrimary">
                    Queue Requested
                  </Typography>
                </>}
              secondary={
                <>
                  <Typography variant='caption' color="textSecondary">
                    {task?.attributes.orationTopic || 'Queue unknown'}
                  </Typography>
                </>}
            />
          </ListItem>
          <Divider variant='inset' />

          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar style={{ background: '#D88738' }}>
                <RecordVoiceOverIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant='overline' color="textPrimary">
                    Transcript
                  </Typography>
                </>}
              secondary={
                <>
                  <Typography variant='caption' color="textSecondary">
                    {transcription?.map((phrase, index) => <span key={index}>{phrase}<br></br></span>) || 'Transcript not available'}
                  </Typography>
                </>}
            />
          </ListItem>
        </List>
      </>
    )
  }
}

export default withTaskContext(TranscriptInfoPanel);