//to strike through a task when the checkbox is clicked
var task_n_date = document.getElementsByClassName('task-and-date');

for(let j of task_n_date)
{
    let checkbox = j.querySelector("input"); //all <input> tags inside class, .task-and-date

    checkbox.addEventListener('click', function() {
        if (this.checked) 
            $(j).css('text-decoration', 'line-through');
         else 
            $(j).css('text-decoration', 'none');
    });
    
}




//to assign different color(s) to the buttons having class 'category-container'
var single_category = document.getElementsByClassName('category-container');


for(var i=0; i<single_category.length; i++)
{
    let req_category = single_category[i].innerText;

        if(req_category == "PERSONAL")
        $(single_category[i]).css('background-color','green');

        else if(req_category === "WORK")
        $(single_category[i]).css( 'background-color', 'violet' );

        else if(req_category === "SCHOOL")
        $(single_category[i]).css( 'background-color', 'darkorange' );

        else if(req_category === "CLEANING")
        $(single_category[i]).css( 'background-color', 'royalblue' );

        else if(req_category === "OTHER")
        $(single_category[i]).css( 'background-color', 'crimson' );
    
}




