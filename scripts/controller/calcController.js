class calcController {

    constructor(){
        this._operation = [0];
        this._locale = 'pt-BR';
        this._displayEl = document.querySelector('#display');
        this._displayTimeEl = document.querySelector('#displayTime');
        this._displayToEl = document.querySelector('#displayTo');
        this._currentTime;
        this.initialize();
        this.initButtonsEvent();
        this.initKeyboard();
        
        
    }

    initialize(){

        this.setTime();   

        setInterval(()=>{
            this.setTime();   
        },1000)
    }

    initKeyboard(){
        document.addEventListener('keyup', e=>{
            
            switch(e.key){
                case 'Enter':
                case '=':
                this.equal();
            break;

            case 'Backspace':
                this.delete();
            break;

            case '.':
                this.addDot('.');
            break;

            case '/':
                this.addOperation('/');
            break;

            case '*':
                this.addOperation('*');
            break;

            case '-':
                this.addOperation('-');
            break;

            case '+':
                this.addOperation('+');
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':       
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseFloat(e.key));
            break;


            }
        })
    }

    operacao(){
        return eval(this._operation.join(""));
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value){
         this._operation[this._operation.length - 1] = value;
    }

    getIndex(){
        return this._operation.indexOf(this.getLastOperation());
    }

    equal(){

        if (this._operation.length == 3){
            this._operation = [this.operacao()];
            this.display = this.getLastOperation();

        } else if (this._operation.length == 2){
            let pos1 = this._operation[0];
            let pos2 = this._operation[1];

            this._operation = [pos1, pos2, pos1];
            this._operation = [this.operacao()];
            this.display = this.getLastOperation();

            console.log(this._operation);
        }

        this._operation = [0];
        
        
    }

    delete(){

        if (!isNaN(this.getLastOperation())){

            let last =  this.getLastOperation().toString().split('');

            

            if (last.length > 1){
                this._operation.pop();
                last.pop();
                last = last.join('');
                this._operation.push(parseFloat(last));
                
                if (last.length == 2){
                    this._operation[last];
                } 
            } else {
                this._operation = [0];
            }

            this.display = this.getLastOperation();
            
        }

    }

    clearAll(){
        this._operation = [0];
        console.log(this._operation);
        this.display = 0;
    }

    clearEntry(){
        
            this._operation.splice(this.getIndex(), 1);
        

        console.log(this._operation);
        
       
    }

    addDot(){
        let lastOperation = this.getLastOperation();

        if (isNaN(lastOperation) || !lastOperation){

            if (this._operation[0] == 0){
                this._operation = [];
            }

            if (this._operation[2] == 0){
                this._operation.pop();
            }
            this._operation.push('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.')
        }
        this.display = this.getLastOperation();
        console.log(this._operation)
    }

    addOperation(value){

        if (this._operation == ''){


            if (isNaN(value)) {
                // se for o primeiro valor adcionado e for uma operação
                if (value == ','){
                    this._operation = [0]
                    this.display = this._operation + '.';
                }

                this._operation = [0 , value];
                
            } else {
                // se for o primeiro valor adcionado e for um número 
                this._operation.push(value);
                this.display = this.getLastOperation();
            }

            
            
                
        } else {


            if (this._operation != ''){
                // se ja tiver algum valor
                if(isNaN(this.getLastOperation())){
                    // se o ultimo for uma operação 
                    if(isNaN(value)){
                        // se o adcionado agora for outra operação 
                        
                        this.setLastOperation(value);
                        
                    } else {
                        // se o adcionado agora for um número
                        this._operation.push(value);
                        this.display = this.getLastOperation();
                        
                    }
                } else {
                    // se o ultimo for um número
                    if(isNaN(value)){
                        // se o adcionado agora for uma operação 
                        
                        this._operation.push(value); 
                        
                    } else {
                        // se o adcionado agora for outro numero 
                        let lastNumber = this.getLastOperation();
                        let nowNumber = value;
                        let newNumber = lastNumber.toString() + nowNumber.toString();
                        this.setLastOperation(parseFloat(newNumber));
                        this.display = this.getLastOperation();
                        
                    }        
                }
                

                if (value == '±'){
                    if (this._operation.length <= 2){
                        let last = this._operation[0].toString();
                        last = '-'+last;
                        this._operation = [parseFloat(last)];
                        this.display = this.getLastOperation();
                    } else {
                        let last = this._operation[2].toString();
                        last = '-'+last;
                        this._operation = [this._operation[0], this._operation[1], parseFloat(last)];
                        var operacao = eval(this._operation.join(""));
                        this._operation = [operacao];
                        this.display = this.getLastOperation();
                    }
                    
                }
                

                if (value == '¹/x'){

                }

                if (value == 'x²'){
                    if (this._operation[1] == 'x²'){
                        let square = this._operation[0] * this._operation[0];
                        this._operation = [square];
                    } else {
                        let square = this._operation[2] * this._operation[2];
                        this._operation = [this._operation[0], this._operation[1], square];
                        var operacao = eval(this._operation.join(""));
                        this._operation = [operacao];
                    }
                    this.display = this.getLastOperation();
                    
                }

                if (value == '√'){
                    if (this._operation[1] == '√'){
                        let root = Math.sqrt(this._operation[0]);
                        this._operation = [root];
                    } else {
                        let root = Math.sqrt(this._operation[2]);
                        this._operation = [this._operation[0], this._operation[1], root];
                        var operacao = eval(this._operation.join(""));
                        this._operation = [operacao];
                    }
                    this.display = this.getLastOperation();
                }

                if (value == '¹/x'){
                    if (this._operation[1] == '¹/x'){
                        let reci = 1 / this._operation[0];
                        this._operation = [reci];
                    } else {
                        let reci = 1 / this._operation[2];
                        this._operation = [this._operation[0], this._operation[1], reci];
                        var operacao = eval(this._operation.join(""));
                        this._operation = [operacao];
                    }
                    this.display = this.getLastOperation();
                }

                if (value == '%'){
                    if (this._operation[1] == '%'){
                        let percent = this._operation[0] / 100;
                        
                        this._operation = [percent]
                        this.display = this.getLastOperation();
    
                    } else if (this._operation[3] == '%') {
                        
                        let percent = (this._operation[2] / 100) * this._operation[0];

                        this._operation = [this._operation[0], this._operation[1], percent];
                        
                        var operacao = eval(this._operation.join(""));

                        this._operation = [operacao];

                        this.display = this.getLastOperation();
                       // this._operation = [percent]
                       // this.display = this.getLastOperation();
                    }
                }

               

                if (this._operation.length == 4){

                    let lastOperation = this.getLastOperation();
                    

                    if (lastOperation == this._operation[1]) {

                        let ultimo = this._operation[2];
                        let penultimo = this._operation[0];
                        let sinal = this._operation[1];

                        this._operation = [penultimo, sinal, ultimo];

                        var operacao = eval(this._operation.join(""));

                    } else {

                        this.clearEntry();

                         var operacao = eval(this._operation.join(""));

                    }

                    this._operation = [operacao, lastOperation];

                    this.display = this._operation[0];

                    if (!isNaN(this.getLastOperation)){
                        this.display = this.getLastOperation();
                    }


                    
                    
                 }
        
                
                
            }    

        }

       


        console.log(this._operation);
    }

    execBtn(value){
        
        switch(value){
            case '=':
                this.equal();
            break;

            case '←':
                this.delete();
            break;

            case 'CE':
               this.clearEntry();
            break;

            case 'C':
                this.clearAll();
            break;

            case ',':
                this.addDot('.');
            break;

            case '√':
                this.addOperation('√');
            break;

            case 'x²':
                this.addOperation('x²');
            break;

            case 'x²':
                this.addOperation('x²');
            break;

            case '¹/x':
                this.addOperation('¹/x');
            break;

            case '%':
                this.addOperation('%');
            break;

            case '±':
                this.addOperation('±');
            break;

            case '÷':
                this.addOperation('/');
            break;

            case 'X':
                this.addOperation('*');
            break;

            case '-':
                this.addOperation('-');
            break;

            case '+':
                this.addOperation('+');
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':       
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseFloat(value));
            break;

            default:
                this.setError();
            break;
        }
    }

    initButtonsEvent(){
        let buttons = document.querySelectorAll(".btn");
        
        buttons.forEach((btn)=>{
            btn.addEventListener('click', e =>{

                let textBtn = btn.innerHTML;

                this.execBtn(textBtn);
            })

            
        })

    }

    setTime(){
        this.displayTime = this.currentTime.toLocaleTimeString(this._locale);
    }


    get display(){
        return  this._displayEl.innerHTML;
    }

    set display(value){
        this._displayEl.innerHTML = value;
    }

    get displayTime(){
        return this._displayTimeEl.innerHTML;
    }

    set displayTime(value){
        this._displayTimeEl.innerHTML = value;
    }

    get currentTime(){
        return new Date();
    }

    set currentTime(value){
        this._currentTime = value;
    }
}