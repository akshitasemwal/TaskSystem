export class Task{
    date: Date = new Date();
    entityName: string = '';
    taskType: string = '';
    time: String = '';  
    contactPerson: string = ''; 
    note?: string; 
    status: string = '';  //initially open
}
