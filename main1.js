
let plus=document.querySelector(".add");
let form=document.querySelector(".alert");
let inp=document.getElementById("inp");
let ok=document.getElementById("ok");
let cancel=document.getElementById("cancel");
let articles=document.querySelector(".articles");
let allarticles=document.querySelectorAll(".article");
let add=document.querySelector(".add");
let arr=[];
let local_arr=[];
let obj=new Object({
    name:"name",
    date:"1111",
    flag:false,
});
let obj2=new Object({
    name:"name",
    date:"1111",
    flag:false,
});





// localStorage
function load_from_localstorage(){
    local_arr=localStorage.getItem("array");
    arr=JSON.parse(local_arr);
   if(arr===null){
    arr=[];
   }
   else{
    create_article();
   }
}
load_from_localstorage();


add.addEventListener('click',function(){
    form.style.display='block';
})


ok.addEventListener('click',function(e){
    e.preventDefault();
    let text=inp.value;
    if(text.length>0){
        arr.push(Object.create(obj));
        arr[arr.length-1].name=text;
        arr[arr.length-1].date=get_date();
        arr[arr.length-1].flag=false;
        inp.value="";
        form.style.display='none';  
        create_article(arr[arr.length-1]);
    }
    
})


 function get_date(){
    let newdate=new Date();
     return `${newdate.getDate()}/${newdate.getMonth()+1}/${newdate.getFullYear()}`;
 }

 
 function create_article(){
    let index=0;
    articles.innerHTML='';
    for(let i=0;i<arr.length;i++){
        let div=document.createElement("div");
        div.className='article';
        let x=`
        <ul class="icons">
         <button onclick="update(${index})">
         <i class="fa-solid fa-pen"></i>
         </button>
         <button onclick="check(${index})">
         <i class="fa-solid fa-check checked"></i>
         </button>
         <button onclick="remove(${index})">
         <i class="fa-solid fa-trash delete"></i>
         </button>
        </ul>
        <div class="text">
           <p class="name">${arr[i].name}</p>
           <div class="date">
             <p>${arr[i].date}</p>
             <i class="fa-regular fa-calendar-days"></i>
           </div>
        </div>
        `;
       div.innerHTML=x;
       articles.prepend(div);
       if(arr[i].flag===true){
        let art=articles.firstElementChild;
        art.style.backgroundColor='rgba(185, 253 , 160)';
       }
       local_arr=JSON.stringify(arr);
       localStorage.setItem("array",local_arr);
       index++;
    }
    
 }


 function remove(ind){
    let conf=confirm(`${arr[ind].name} هل تريد حذف `);
    if(conf){
     articles.innerHTML="";
     arr.splice(ind,1);
     create_article();
    }
 }


 function check(ind){
     if(arr[ind].flag===false){
        arr[ind].flag=true;
     }
     else{
        arr[ind].flag=false;
     }
     create_article();
 }


function update(ind){
   let str=prompt("enter the new name",arr[ind].name);
   if(str.length>0){
    arr[ind].name=str;
    create_article();
   }
}


cancel.addEventListener('click',function(e){
    e.preventDefault();
    form.style.display='none';
})





