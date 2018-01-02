
import axios from 'axios'

export default class ArtyomCommandsManager {

    // The ArtyomCommandsManager class expects as argument in the constructor
    // an already declared instance of Artyom.js
    constructor (ArtyomInstance){
        this._artyom = ArtyomInstance;
    }

    // Execute the loadCommands method to inject the methods to the instance of Artyom
    loadCommands(){
        let Artyom = this._artyom;

        // Here you can load all the commands that you want to Artyom
        return Artyom.addCommands([
            {
                indexes: ["hello", "hi"],
                action: () => {
                    Artyom.say("Hello, how are you?");
                }
            },
            {
                indexes: [/How are you/, /Regular expressions supported/],
                smart: true,
                action: () => {
                    Artyom.say("I'm fine, thanks for asking !");
                }
            },
            {
                indexes: ["Generate reports of * of this year"],
                smart: true,
                action: (i, month) => {
                    let year = new Date().getFullYear();

                    Artyom.say(`Generating reports of ${month} ${year} `);

                    Artyom.say("Ready ! What were you expecting? write some code you lazy bear !");
                }
            },
            {
              indexes: ["What is the weather like"],
              action: () => {
                axios.get("http://api.openweathermap.org/data/2.5/forecast?id=1880252&APPID=6feeacb3997e0e4f4a7f9e9c4b193934")
                .then(result=>{
                  let data = Math.floor(result.data.list[0].main.temp) - 273
                  Artyom.say(`Temperature is ${data} degrees celcius`);
                })

              }
            }
        ]);
    }
}
