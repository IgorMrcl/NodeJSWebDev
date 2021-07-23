import {Pulser} from './pulser.mjs';

//Instantiate a Pulser object
const pulser = new Pulser();
//Handler function
pulser.on('pulse', (...args)=> {
    console.log(`${new Date().toISOString()} pulse received - ${args[1] + parseInt(args[0])}`);
});
//Start is pulsing
pulser.start();