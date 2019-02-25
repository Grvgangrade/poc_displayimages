var images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpg',
    'images/9.jpg',
    'images/10.jpg',
    'images/11.jpg',
    'images/12.jpg',
    'images/13.jpg',
    'images/14.jpg',
    'images/15.jpg'
]

//Loading images on start
window.addEventListener('load', loadImages(images) , false);
function loadImages(images){
    //Displaying all images
    images.map((img,index) => {
        var i = document.createElement('img');
        i.src = img;
        i.id= `img${index}`;
        i.classList.add('images');
        document.getElementById('content').appendChild(i);

        //fetching the Exif data
        i.onload = function(){
            EXIF.getData(i , function(){
                myData = this;
                console.log(myData.exifdata)

                //checking if image is clicked from camera
                if(EXIF.pretty(this)){
                    var para = document.createElement('p');
                    para.id = `p${index}`;
                    para.innerHTML = 'This photo was taken on ' + myData.exifdata.DateTime + ' with a ' + myData.exifdata.Make + ' ' + myData.exifdata.Model;
                    var ele = document.getElementById(`img${index}`)
                    console.log(ele)
                    ele.parentNode.insertBefore(para , ele.nextSibling);

                    //to convert degree , minute, second , direction in decimals
                    function ConvertDMSToDD(degrees, minutes, seconds, direction) {
                        var dd = degrees + (minutes/60) + (seconds/3600);
                        if (direction == "S" || direction == "W") {
                            dd = dd * -1; 
                        }
                        return dd;
                    }
                    //calculate latitude values
                    var latDegree = myData.exifdata.GPSLatitude[0].numerator;
                    var latMinute = myData.exifdata.GPSLatitude[1].numerator;
                    var latSecond = myData.exifdata.GPSLatitude[2].numerator;
                    var latDirection = myData.exifdata.GPSLatitudeRef;

                    var latFinal = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
                    console.log(latFinal);

                    // Calculate longitude decimal
                    var lonDegree = myData.exifdata.GPSLongitude[0].numerator;
                    var lonMinute = myData.exifdata.GPSLongitude[1].numerator;
                    var lonSecond = myData.exifdata.GPSLongitude[2].numerator;
                    var lonDirection = myData.exifdata.GPSLongitudeRef;

                    var lonFinal = ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);
                    console.log(lonFinal);

                    //displaying lat and long
                    var maplink = document.createElement('p');
                    maplink.innerHTML = 'Latitude: ' + latFinal + ' and Longitude: ' + lonFinal;
                    var ele = document.getElementById(`p${index}`)
                    console.log(ele)
                    ele.parentNode.insertBefore(maplink , ele.nextSibling);

                } else {
                    var para = document.createElement('p');
                    para.textContent = 'No data found for this image';
                    var ele = document.getElementById(`img${index}`)
                    ele.parentNode.insertBefore(para , ele.nextSibling);
                }
            });
        }
    })
}