import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const CalendarPage = () => {
  const [events, setEvents] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleAddEvent = () => {
    if (!eventName || !selectedDate) {
      alert('Please enter an event name.');
      return;
    }

    const newEvent = {
      title: eventName,
      date: selectedDate
    };

    setEvents([...events, newEvent]);
    setEventName('');
    setSelectedDate('');
    setShowDialog(false);
  };

  return (
    <div>
      <h2>My Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        dateClick={handleDateClick}
      />
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>이벤트 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            type="text"
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            취소
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalendarPage;






