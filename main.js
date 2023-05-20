rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreleftwrist=0;
scorerightwrist=0;

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
    if(scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        play=song.isPlaying();
        play1=song1.isPlaying();
        if(play1==true){
            song1.stop()
            song.play()
            console.log("song is playing");
        }
        else{
            song.play()
            console.log("song one is playing");
        }
    }
}