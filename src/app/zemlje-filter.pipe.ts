import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name:'zemljeFilter'})
export class ZemljeFilterPipe implements PipeTransform{
    transform(zemlje:any[], pretraga:string):any[] {
        if(!zemlje || !pretraga){
            return zemlje;
        }
        return zemlje.filter(zemlje => zemlje.naziv.toLowerCase().indexOf(pretraga.toLowerCase())!==-1);
    }
    
}
