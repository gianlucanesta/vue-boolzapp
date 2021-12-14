// -Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
// -Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti.

Vue.config.devtools = true;


const app = new Vue({
    el: '#root',
        
    data: {
        ownerName: "Alessia",
        ownerImage: 'img/avatar_io.jpg',
               
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],

        messageInputBar: "",
        searchUser: "",

        currentUser: {
            name: "",
            avatar: "",
            visible: true,
            messages: [{}] 
        }
    },
    methods: {
        // Cambio il contatto in base alla selezione dalla lista contatti
        changeContact(index) {
            this.currentUser = this.contacts[index];
        },

        // Restituisce data e ora corrente tramite la libreria dayJS
        actualTime() {
            const completeDate = dayjs().format("DD/MM/YYYY HH:mm:ss");
            return completeDate;
        },
        
        // Invia il messaggio
        sendMessage() {
            const messages = this.currentUser.messages;

            if (this.messageInputBar.trim().length > 0) {
                
                messages.push(
                    { 
                        date: this.actualTime(),
                        text: this.messageInputBar,
                        status: "sent"
                    }
                );

                // Una volta inviato il messaggio pulisce la barra di input
                this.messageInputBar = "";
            
                // Riceve automaticamente la risposta dopo un lasso di tempo prefefinito
                this.receiveMessage();        
            }    
                   
        },

        // Ricevi messaggio automatico dopo 1 secondo
         receiveMessage() {
            setTimeout(function () {
                app.currentUser.messages.push(
                    {
                        date: app.actualTime(),
                        text: "Ok",
                        status: "received"
                    }
                );
            }, 1000);
        },

        //Filtro ricerca fra i contatti 
        filter() {
            const searchUser = this.searchUser.toLowerCase();
            this.contacts.forEach(function (element) {

                if(element.name.toLowerCase().includes(searchUser)) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        }
    }, 
    mounted() {
        // Scelgo il primo contatto come default 
        this.currentUser = this.contacts[0];
    }

});

