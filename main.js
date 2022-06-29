status=""
object=[]
ringtone=""

function preload(){
    ringtone=loadSound("alarm.mp3")
  }
function setup(){
    canvas=createCanvas(380,380)
    canvas.center()
    
    video= createCapture(VIDEO)

    video.size(380,380)
    video.hide()
    
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status: detecting objects "
}



function modelLoaded(){
    console.log("modelLoaded")
status=true

}

function draw(){
    image(video,0,0,380,380)
    /*fill("white")
    text("dog",45,75)
    noFill()
    stroke("red")
    rect(30,60,450,350)

    fill("white")
    text("cat",320,120)
    noFill()
    stroke("red")
    rect(300,90,270,320)*/

    if(status !=""){

        r=random(255)
        g=random(255)
        b=random(255)
        objectDetector.detect(video,gotResult)
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status:objects detected "
           
            fill(r,g,b)
            precent=floor(object[i].confidence*100)
            text(object[i].label+""+precent+"%",object[i].x,object[i].y)
            noFill()
            stroke(r,g,b)
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
            if(object[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="baby found"
                ringtone.stop()
            }
            else{
                document.getElementById("number_of_objects").innerHTML="baby not found"
                ringtone.play()
            }
        }
    }
}

function gotResult(error,result){
    if(error){
        console.log(error)
    }
    console.log(result)
    object=result

}