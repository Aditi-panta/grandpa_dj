rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreleftwrist=0;
scorerightwrist=0;
song1_status="";
song_status="";
song="";
song1="";

function preload(){
    song=loadSound("music.mp3");
    song1=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("scorerightwrist="+scorerightwrist+"scoreleftwrist"+scoreleftwrist);
        console.log("right wrist x="+rightWristX+"right wrist y="+rightWristY);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist x="+leftWristX+"left wrist y="+leftWristY);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist="+scoreleftwrist);
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if (scorerightwrist>0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song_status==false){
            song.play();
            document.getElementById("song").innerHTML="Playing Harry Potter theme song";
        }
    }
    if (scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        song.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Peter Pan song";
        }
    }
}
