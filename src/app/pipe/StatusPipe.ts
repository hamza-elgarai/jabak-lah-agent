import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'status'})
export class StatusPipe implements PipeTransform {
    transform(value: string) {
        if(value==='pending') return "En attente";
        if(value==='verified') return "Vérifié";
        if(value==='not-verified') return "Non vérifié";
        return ""  
    }
}