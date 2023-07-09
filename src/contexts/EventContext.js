import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

const EventContext = createContext();

export const EventProvider = ({children}) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const userData = useSelector(state => state.Reducers.userData);
  const userId = userData._id;

  const fetchSavedEvents = async () => {
    try {
      const {data} = await axios.get(
        `https://kweeble.herokuapp.com/api/${userId}`,
      );

      setSavedEvents(data.savedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  const addSavedEvent = (eventId, callback) => {
    setSavedEvents(prevState => [...prevState, eventId]);
    callback();
  };

  const removeSavedEvent = (eventId, callback) => {
    setSavedEvents(prevState => prevState.filter(event => event !== eventId));
    callback();
  };

  useEffect(() => {
    fetchSavedEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EventContext.Provider
      value={{
        savedEvents,
        fetchSavedEvents,
        addSavedEvent,
        removeSavedEvent,
      }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
