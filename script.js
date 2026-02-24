  let interviewList= []
let rejectedList= []

  let currentStatus= 'all';

 let total = document.getElementById('total');

let interviewCount = document.getElementById('interviewcount');

// getting ids andd classes i need

let jobCount= document.getElementById('job-count')
// console.log(jobCount.innerText)

let rejectedCount = document.getElementById('rejectedCount')

const allFilterButton = document.getElementById('all-filter-btn')
const interviewFilterButton = document.getElementById('interview-filter-btn')

const rejectedFilterButton = document.getElementById('rejected-filter-btn')


const allCardSection= document.getElementById('allCards');

   const mainContainer= document.querySelector('main');   

const filterSection= document.getElementById('filtered-section')

//calculation

function numberCount() {


    total.innerText = allCardSection.children.length;

    interviewCount.innerText = interviewList.length


    rejectedCount.innerText = rejectedList.length
       jobCount.innerText=allCardSection.children.length;

}

   numberCount(); //add in delegation later


function toggleStyle(id) {
    // neutralizing all all
    allFilterButton.classList.add('bg-gray-300', 'text-black');


    interviewFilterButton.classList.add('bg-gray-300', 'text-black');

     rejectedFilterButton.classList.add('bg-gray-300', 'text-black')

    // if any button has blue then remove
    allFilterButton.classList.remove('bg-blue-600', 'text-white')

    interviewFilterButton.classList.remove('bg-blue-600', 'text-white')

    rejectedFilterButton.classList.remove('bg-blue-600', 'text-white')

    // console.log(id);
    const selected= document.getElementById(id); // this is the button that clicked for filter

    currentStatus= id;
    console.log(currentStatus)  //remove  later


    // console.log(selected);

    // adding blue bg for current button
    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-blue-600', 'text-white')
    // step 1 finish

    // show and hidden particular section
    
    
    if (id  =='interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')

       



    //add render here later
      renderInterview();

      if(interviewList.length==0 && allCardSection!==0)
      {
        document.getElementById('no-data-page').classList.remove('hidden')
      } else{
           
        document.getElementById('no-data-page').classList.add('hidden')

      }


    } 
    
    
    
    else if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')

    } 
       else if (id=='rejected-filter-btn') 
        
        {
        allCardSection.classList.add('hidden')

        filterSection.classList.remove('hidden')

          // add render heree later
          renderRejected();

          if(rejectedList.length==0  && allCardSection!==0)
      {
        document.getElementById('no-data-page').classList.remove('hidden')
      }   

      else{
           
        document.getElementById('no-data-page').classList.add('hidden')

      }


    }




}

 //delegation
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parentNode  = event.target.parentNode.parentNode;

        const jobTitle= parentNode.querySelector('.job-title').innerText
          const type  = parentNode.querySelector('.type').innerText
        const benefit= parentNode.querySelector('.benefit').innerText
        const status= parentNode.querySelector('.status').innerText = 'Interview';
        const notes =  parentNode.querySelector('.notes').innerText

        

        const cardInfo = {
            jobTitle,
            type,
            benefit,
            status: 'Interview',
            notes
        };

        const jobExists = interviewList.find(item => item.jobTitle == cardInfo.jobTitle);

        if (!jobExists) {
            interviewList.push(cardInfo);

        }

    
        rejectedList=rejectedList.filter(item => item.jobTitle != cardInfo.jobTitle);

        
          
            if (currentStatus == 'rejected-filter-btn') {
                renderRejected()
            }
          numberCount();
        
        // console.log(event.target.classList.contains('rejected-btn'))
    } 
      else if (event.target.classList.contains
        ('rejected-btn')) 



        {


        const parentNode = event.target.parentNode.parentNode

     const jobTitle= parentNode.querySelector('.job-title').innerText
 const type= parentNode.querySelector('.type').innerText;
 const benefit=parentNode.querySelector('.benefit').innerText
    const status= parentNode.querySelector('.status').innerText;




        const notes=  parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.status').innerText = 'rejected';

        const cardInfo= {

            jobTitle,
            type,
            benefit,
            status:'rejected',
            notes
        }

        const jobExists=rejectedList.find(item => item.jobTitle == cardInfo.jobTitle);

        if (!jobExists) {
            rejectedList.push(cardInfo);
        }

        
           interviewList=  interviewList.filter(item => item.jobTitle !=cardInfo.jobTitle);

        // console.log(interviewList);

        // after remove rerender the html
        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }

                numberCount();

    }   

     else if(event.target.closest('.btn-delete'))

      {
          const parentNode=event.target.closest('.card')

        //   console.log(parentNode)
      const card=event.target.closest('.card')
       const JobTitleElem= card.querySelector('.job-title')

        const jobTitle=JobTitleElem.innerText
        console.log("deleting", jobTitle)

        interviewList= interviewList.filter(i=> i.jobTitle !== jobTitle)

    rejectedList= rejectedList.filter(i=> i.jobTitle !== jobTitle)


        const allCards= document.querySelectorAll('#allCards .card')

        for(const card of allCards)
        {
            // console.log(card)
          
            const titleOfCard=card.querySelector('.job-title').innerText

            if(titleOfCard=== jobTitle)
            {
                card.remove();


            }
        }

        if(currentStatus=== 'interview-filter-btn')
        {
           renderInterview()
        }

        else if(currentStatus==='rejected-filter-btn')
            {
                renderRejected();
            } 



            
            numberCount();


  


      }  
        
        



});

// blank page toggle




function renderInterview() {
    
    filterSection.innerHTML = '';

    
    for (let interview of interviewList) {
        // console.log(interview)

        let div = document.createElement('div')
        div.className= 'card flex justify-between border p-8';
        div.innerHTML= `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="job-title text-4xl">${interview.jobTitle}</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2 flex-col">
                        <p class="type bg-gray-200 px-5">${interview.type}</p>
                        <p class="benefit bg-gray-200 px-5">${interview.benefit}</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${interview.status}</p>
                     <p class="notes">${interview.notes}</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">rejected</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete py-2"> 
                        <span><i class="fa-regular fa-trash-can"></i></span> 
                    </button>
                </div>
        `;

        filterSection.appendChild(div);
    }
}

function renderRejected() {
    
    filterSection.innerHTML= '';

    for (let rejected of rejectedList) 
        
        {

        let div=document.createElement('div');
        div.className= 'card flex justify-between border p-8';
        div.innerHTML= `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="job-title text-4xl">${rejected.jobTitle}</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2 flex-col">
                        <p class="type bg-gray-200 px-5">${rejected.type}</p>
                        <p class="benefit bg-gray-200 px-5">${rejected.benefit}</p>
                    </div>
                    <!-- part 3 -->
                     <p class="status">${rejected.status}</p>
                     <p class="notes">${rejected.notes}</p>

                     <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">rejected</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete py-2"> 
                        <span><i class="fa-regular fa-trash-can"></i></span> 
                    </button>
                </div>
        `;


        filterSection.appendChild(div);


    }
}