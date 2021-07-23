import EventEmitter from 'events';

export class Pulser extends EventEmitter {
    start() {
        setInterval(() =>{
            console.log(`${new Date().toISOString()} >>>> pulse`);
            this.emit('pulse', Math.random() * (50 - 30) + 30, 'Olá, o número gerado foi: ');
            console.log(`${new Date().toISOString()} <<<< pulse`);
        }, 1000);
    }
}