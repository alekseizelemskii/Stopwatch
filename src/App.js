import React, { useState, useEffect } from 'react';
import { interval } from 'rxjs';
import { Grid, Typography, Button, ButtonGroup } from '@material-ui/core';



const App = () => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStoped, setIsStoped] = useState(false);
  const [isWaited, setIsWaited] = useState(false);

  const intervalStream$ = interval(1000)

  useEffect(() => {
    const intObs = intervalStream$.subscribe(() => {
      if (isActive) 
        {setTimer((v) => v + 1)}
    });
    
    return () => intObs.unsubscribe();

  },[isActive]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsStoped(false);
  }

  const handleStop = () => {
    setIsActive(false);
    setTimer(0);
    setIsStoped(false);
  }
  
  const handleWait = () => {
    setTimeout(()=> {
      
      setIsWaited(true);
      setIsActive(false)}, 300
      )
  };

  const handleReset = () => {
    setIsActive(false);
    setTimer(0);
    setIsActive(true);
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  
  return (

        <Grid container spacing={3} direction="column" justify='center' alignItems='center'>
          
          <Grid item>
            <Typography color="primary" variant="h4">React Stopwatch</Typography>
          </Grid>
            
            <Grid item>
              <Typography color="secondary" variant="h5">{formatTime()}</Typography>
            </Grid>
          <Grid item>
              <ButtonGroup color="primary">
              {          
              !isActive ?
                (<Button onClick={handleStart}>Start</Button>)
              :
                (<Button onClick={handleStop}>Stop</Button>)
              }
              <Button onDoubleClick={handleWait}>Wait</Button>
              <Button onClick={handleReset}>Reset</Button>
            </ButtonGroup>
          </Grid>

        </Grid>
        
    
  );
}

export default App;
