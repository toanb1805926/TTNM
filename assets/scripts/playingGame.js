// Dữ liệu mẫu
var value = [
    {
        id: 1,
        tenKhoaHoc: 'Ichthyophis nguyenorum Nishikawa, Matsui, and Orlov, 2012',
        tenDiaPhuong: 'Rắn trun đĩa',
        moiTruongSong: 'dưới lòng đất',
        thucAn: 'vi sinh vật',
        SuThatThuVi: 'không có',
        SuThatThuVi2: 'không có',
        trangThaiMo: true,
        loai: 'common'
    },
    {
        id: 2,
        tenKhoaHoc: 'Duttaphrynus melanostictus (Schneider, 1799)',
        tenDiaPhuong: 'Cóc',
        moiTruongSong: 'trên cạn',
        thucAn: 'vi sinh vật',
        SuThatThuVi: 'không có',
        SuThatThuVi2: 'không có',
        trangThaiMo: true,
        loai: 'common'
    },
    {
        id: 3,
        tenKhoaHoc: 'Kaloula pulchra Gray, 1831',
        tenDiaPhuong: 'Ễn ương',
        moiTruongSong: 'trên cạn',
        thucAn: 'vi sinh vật',
        SuThatThuVi: 'không có',
        SuThatThuVi2: 'không có',
        trangThaiMo: false,
        loai: 'common'
    },
    {
        id: 4,
        tenKhoaHoc: 'Microhyla heymonsii Vogt, 1911',
        tenDiaPhuong: 'Nhóc nhen',
        moiTruongSong: 'trên cạn',
        thucAn: 'vi sinh vật',
        SuThatThuVi: 'sự thật thú vị 1',
        SuThatThuVi2: 'không có',
        trangThaiMo: true,
        loai: 'uncommon'
    },
    {
        id: 5,
        tenKhoaHoc: 'Hylarana erythraea (Schlegel, 1837)',
        tenDiaPhuong: 'Bù tọt',
        moiTruongSong: 'trên cạn, trên cây',
        thucAn: 'vi sinh vật',
        SuThatThuVi: 'sự thật thú vị 1',
        SuThatThuVi2: 'không có',
        trangThaiMo: false,
        loai: 'uncommon'
    },
    {
        id: 6,
        tenKhoaHoc: 'Polypedates megacephalus Hallowell, 1861',
        tenDiaPhuong: 'Hót cổ',
        moiTruongSong: 'trên cạn',
        thucAn: 'vi sinh vật',
        SuThatThuVi: 'sự thật thú vị 1',
        SuThatThuVi2: 'sự thật thú vị 2',
        trangThaiMo: false,
        loai: 'rare'
    },
]

// Khai báo biến:
var levelSelected = null;
var kindSelected = null;
var randomNumber = null;
var answersAndQuestionSelected = {
    question: null,
    answer1: null,
    answer2: null,
    answer3: null,
    answer4: null
}

const levelOfPlay = [
    {
        levelName: 'Dễ',
        rateOfKinds: [
            {
                nameOfKind: 'common',
                rate: 80
            },
            {
                nameOfKind: 'uncommon',
                rate: 19
            },
            {
                nameOfKind: 'rare',
                rate: 1
            }
        ]
    },
    {
        levelName: 'Trung bình',
        rateOfKinds: [
            {
                nameOfKind: 'common',
                rate: 50
            },
            {
                nameOfKind: 'uncommon',
                rate: 40
            },
            {
                nameOfKind: 'rare',
                rate: 10
            }
        ]
    },
    {
        levelName: 'Khó',
        rateOfKinds: [
            {
                nameOfKind: 'common',
                rate: 30
            },
            {
                nameOfKind: 'uncommon',
                rate: 50
            },
            {
                nameOfKind: 'rare',
                rate: 20
            }
        ]
    }
];

var idsOfCommonKind = [1,2,3];
var idsOfUncommonKind = [4,5];
var idsOfRareKind = [6];
var audio = null;
var isplayaudio = null;
var isCloseAble = null;

var currentIdOfAnimalBeingAsked = null;
var currentQuestion = null;
var currentCorrectAnswer = null;
var currentIdOfIncorrectAnswers = [null, null, null];
var currentAnswers = [null, null, null, null];
var idOfAnimalsReadyToUnlock = [];

var currentRound = null;
var isCurrentAnimalNew = false;
var numberOfCorrectRound = 0
var numberOfAnimals = 0;
var numberOfAnimalsOpened = 0;
var numberOfRoundNeedToWin = 0;

// random câu TL và câu hỏi
const randomAnswersAndQuestion = () => {
    // Mảng các id của loại ĐV đã được chọn
    let arrIdsSelected = kindSelected==='common'? idsOfCommonKind: (kindSelected==='uncommon'? idsOfUncommonKind:idsOfRareKind);
    console.log("arrIdsSelected: ", arrIdsSelected);
    // id của ĐV đang được hỏi
    currentIdOfAnimalBeingAsked = arrIdsSelected[Math.floor(Math.random()*arrIdsSelected.length)];
    // console.log(`Id động vật đang được hỏi: ${currentIdOfAnimalBeingAsked}`);
    let [{tenKhoaHoc, moiTruongSong, thucAn, tenDiaPhuong}] = value.filter((element) => (element.id===currentIdOfAnimalBeingAsked));
    // đáp án đúng
    currentCorrectAnswer = tenDiaPhuong;
    // câu hỏi
    currentQuestion = `Động vật `;
    if(levelSelected==='Dễ') currentQuestion += `có thức ăn là '${thucAn}', môi trường sống ở '${moiTruongSong}' và tên khoa học là '${tenKhoaHoc}'?`;
    if(levelSelected==='Trung bình') currentQuestion += `có môi trường sống ở '${moiTruongSong}' và tên khoa học là '${tenKhoaHoc}'?`;
    if(levelSelected==='Khó') currentQuestion += `có tên khoa học là '${tenKhoaHoc}'?`;
    // console.log(currentQuestion);
    
    // Reset 3 đáp án sai
    currentIdOfIncorrectAnswers = currentIdOfIncorrectAnswers.map(() => null);
    // random 3 đáp án sai
    for(let i=0;i<3;i++)
    {
        let randomId = null;
        
        while(true){
            randomId = Math.floor(Math.random()*value.length)+1;

            if(randomId===currentIdOfAnimalBeingAsked) continue;

            let isInclude = false;
            for(let j=i;j>=0;j--){
                if(randomId===currentIdOfIncorrectAnswers[j]){
                    isInclude = true;
                    break;
                }
            }
            if(!isInclude) break;
        }
        currentIdOfIncorrectAnswers[i] = randomId;
        currentAnswers[i] = (value.filter((element) => element.id===randomId))[0].tenDiaPhuong;
    }
    // đưa câu trả lời đúng vào vị trí bất kì.
    let randomPositionForCorrectAnswer = Math.floor(Math.random()*currentAnswers.length);
    currentAnswers.splice(randomPositionForCorrectAnswer,0,currentCorrectAnswer);
    currentAnswers.splice(currentAnswers.length-1, 1);
    // console.log('id cua cac cau TL sai: ', currentIdOfIncorrectAnswers);
    // console.log('Danh sach cac cau TL: ', currentAnswers);
    console.log(`Cau TL đúng(id=${currentIdOfAnimalBeingAsked}): ${currentCorrectAnswer}`);
}

// Xử lý ẩn/hiển icon ĐV mới
const HandleHiddentLabelAChievement = () => {
    isCurrentAnimalNew = !(((value.filter(element => element.id===currentIdOfAnimalBeingAsked))[0].trangThaiMo)
                            || idOfAnimalsReadyToUnlock.includes(currentIdOfAnimalBeingAsked));
    document.querySelector('.label').style.display = isCurrentAnimalNew? 'block':'table-row';
}

// Xử lý gán NumberOfAnimalsOpened
const HandleSetNumberOfAnimalOpened = () => {
    numberOfAnimalsOpened = (value.filter(ele => ele.trangThaiMo)).length;
    HandleLoadNumberOfAnimalsAndNumberOfAnimalsOpened();
}

// Xử lý gán lại mục tiêu (button information)
const HandleSetNewTarget = () => {
    let inner = `Để mở khóa được thành tích:\n\t - Hoàn thành chơi 10 câu\n\t - Thắng ${numberOfRoundNeedToWin}/10\n`;
    document.querySelector('.infButton--information').innerText = inner;
}

// Xử lý gán NumberOfAnimals
const HandleSetNumberOfAnimal = () => {
    numberOfAnimals = value.length;
}

// Xử lý lấy NumberOfAnimalsOpened
const HandleGetNumberOfAnimalOpened = () => {
    return numberOfAnimalsOpened;
}

// Xử lý lấy NumberOfAnimals
const HandleGetNumberOfAnimal = () => {
    return numberOfAnimals;
}

// Xử lý load NumberOfAnimals and NumberOfAnimalsOpened
const HandleLoadNumberOfAnimalsAndNumberOfAnimalsOpened = () => {
    let inner = HandleGetNumberOfAnimalOpened()+'/'+HandleGetNumberOfAnimal();
    document.querySelector('.text--achieve').innerText = inner;
}

// Xử lý đóng playing Game
document.querySelector('.closeButton--cssBigger').onclick = () => {
    if(isCloseAble){
        document.getElementById('header').style.display = 'flex';
        document.querySelector('#questionTypes').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
        document.getElementById('playingGame').style.display = 'none';
        if(isplayaudio) HandleSetturnOnOrOffAudio();
    }
}

// Chọn level and play game:
document.querySelectorAll('.questionTypes__Container > div').forEach((element) => {
    element.onclick = () => {
        // ẩn header
        document.getElementById('header').style.display = 'none';
        // ẩn lớp chọn chế đố chơi
        document.querySelector('#questionTypes').style.display = 'none';
        // ẩn lớp overlay
        document.querySelector('.overlay').style.display = 'none';
        // chọn chế độ chơi
        levelSelected = element.innerText.trim();
        console.log('Chế độ chơi: ', levelSelected);
        // hiển thị vòng chơi
        document.getElementById('playingGame').style.display = 'block';
        // Gán số lượng động vật đã mở
        HandleSetNumberOfAnimalOpened();
        // Gán số lượng động vật
        HandleSetNumberOfAnimal();
        // Khởi tạo audio
        initAudio();
        // Kích hoạt nút đóng trò chơi
        isCloseAble = true;

        // bắt đầu chơi game 10 vòng
        runGame();
    }
});

const runGame = () => {
    // Start
    console.log('----------------------Restart----------------------');
    // chọn số bàn cần thắng
    chooseNumberOfRoundNeedToWin();
    console.log('---------------------------------------------------');
    currentRound = 0;
    idOfAnimalsReadyToUnlock = [];
    numberOfCorrectRound = 0;

    // random câu hỏi và câu TL cho vòng chơi đầu tiên.
    nextRound();
}

const nextRound = () => {
    // if(currentRound===10) endGame();
    // else{
        currentRound+=1;
        console.log(`----------------------Vòng ${currentRound}----------------------`);
        // randomNumber
        chooseRandomNumber();
        // console.log('random done.');
        // chọn loại
        chooseKindOfAnimals();
        // console.log('choose kind done.')

        randomAnswersAndQuestion();
        LoadAnswersAndQuestion();
        HandleHiddentLabelAChievement();
        HandleLoadNumberOfAnimalsAndNumberOfAnimalsOpened();
        HandleSetNewTarget();
    // }
}

// Tóm lược mỗi câu đố
const summary = async() => {
    console.log(`Vòng hiện tại: ${currentRound}/10`);
    console.log(`Số câu TL đúng: ${numberOfCorrectRound}/${currentRound}`);
    console.log(`Để mở khóa được thành tích: chơi 10 câu và thắng ${numberOfRoundNeedToWin}/10`);

    // Xử lý kết quả và in ra

    document.querySelector('.currentResult__correct > p').innerText = numberOfCorrectRound;
    document.querySelector('.currentResult__incorrect > p').innerText = currentRound-numberOfCorrectRound;


    let ul = document.querySelector('.containBox--Content__currentAnimalsReadyToUnclock--Animals');
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    console.log(`ID của các ĐV mới: ${idOfAnimalsReadyToUnlock}`);
    idOfAnimalsReadyToUnlock.forEach((identity) => {
        let li = document.createElement('li');
        li.innerText = (value.filter(ele => ele.id===identity))[0].tenDiaPhuong;
        document.querySelector('.containBox--Content__currentAnimalsReadyToUnclock--Animals').append(li);
    });



    // Kết thúc xử lý kết quả và in ra


    if(currentRound===10){
        document.querySelector('.summary').style.display = 'block';
        document.querySelector('.summary__containBox--button').style.display = 'flex';
        document.querySelector('.summary__containBox--arrow-right').style.display = 'block';
        if(numberOfCorrectRound>=numberOfRoundNeedToWin) HandleUnlockAnimalsReadyToOpened();
    }
    else{
        document.querySelector('.summary').style.display = 'block';
        document.querySelector('.summary__containBox--button').style.display = 'none';
        document.querySelector('.summary__containBox--arrow-right').style.display = 'none';
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        })
        document.querySelector('.summary').style.display = 'none';
        nextRound();
    }
}

// Tiếp tục chơi
document.querySelector('.summary__containBox--arrow-right').onclick = () => {
    document.querySelector('.summary').style.display = 'none';
    document.querySelectorAll('.answers > *').forEach(element => {
        element.style.display = 'block';
    })
    runGame();
}

// Quay về
document.querySelector('.summary__containBox--button .containBox--closebutton').onclick = () => {
    document.getElementById('header').style.display = 'flex';
    document.querySelector('#questionTypes').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
    document.getElementById('playingGame').style.display = 'none';
    document.querySelector('.summary').style.display = 'none';
    if(isplayaudio) HandleSetturnOnOrOffAudio();
}

// Chọn randomNumber
const chooseRandomNumber = () => {
    randomNumber = Math.random() * 100;
    console.log('randomNumber: ', randomNumber);
}

// Chọn kind of animals:
const chooseKindOfAnimals = () => {
    levelOfPlay.forEach((level) => {
        if (level.levelName === levelSelected) {

            let rateCommon = level.rateOfKinds[0].rate;
            let rateUnCommon = level.rateOfKinds[1].rate;
            let rateRare = level.rateOfKinds[2].rate;

            let nameCommon = level.rateOfKinds[0].nameOfKind;
            let nameUnCommon = level.rateOfKinds[1].nameOfKind;
            let nameRare = level.rateOfKinds[2].nameOfKind;

            console.log('Common: ', rateCommon);
            console.log('UnCommon: ', rateCommon + rateUnCommon);
            console.log('Rare: ', rateRare + rateCommon + rateUnCommon);

            kindSelected = (randomNumber <= rateCommon) ? nameCommon : ((randomNumber <= (rateCommon + rateUnCommon)) ? nameUnCommon : nameRare);
        }
    });
    console.log('kindSelected: ', kindSelected);
}

const chooseNumberOfRoundNeedToWin = () => {
    numberOfRoundNeedToWin = levelSelected==='Dễ'? 6:(levelSelected==='Trung bình'? 7:8);
}

// Hàm load câu hỏi và câu TL lên UI
const LoadAnswersAndQuestion = () => {
    document.getElementById('question').innerText = currentQuestion;
    document.querySelector('.answers__answer1').innerText = currentAnswers[0];
    document.querySelector('.answers__answer2').innerText = currentAnswers[1];
    document.querySelector('.answers__answer3').innerText = currentAnswers[2];
    document.querySelector('.answers__answer4').innerText = currentAnswers[3];
}

// Hàm xử lý chọn lựa đáp án
document.querySelectorAll('.answers .answers__containtBox').forEach((element, index, array) => {
    element.onclick = () => {
        let oldColor = element.style.backgroundColor;
        // Handle
        let elementUnselected = Object.values(array).filter(ele => ele!==element);
        let HandleSelected = () => {
            element.querySelector('.overlayAnswers').style.transition = '3s ease';
            element.querySelector('.overlayAnswers').style.width = '246px';
        }
        let HandleUnselected = () => {
            element.querySelector('.overlayAnswers').style.transition = 'none';
            element.querySelector('.overlayAnswers').style.width = '0px';
        }
        let HandleHiddenUnselected = () => {
            elementUnselected.forEach(ele => {
                ele.style.display = 'none';
            })
        }
        let HandleVisibleUnselected = () => {
            elementUnselected.forEach(ele => {
                ele.style.display = 'block';
            })
        }
        let HandleSetClickableCloseButton = () => {
            document.querySelector('')
        }

        let HandleSelectAnswers = () => {
            return new Promise((resolve, reject) => {
                HandleSelected();
                HandleHiddenUnselected();
                isCloseAble = false;
                setTimeout(() => {
                    if(element.innerText===currentCorrectAnswer){
                        numberOfCorrectRound+=1;
                        resolve();
                    }
                    else reject();
                }, 3000);
            });
        }
        
        HandleSelectAnswers()
            .then(() => {
                HandleSignalTheCorrectAnswer();
                element.style.transition = '.5s ease';
                element.style.backgroundColor = '#3fa64e';
            })
            .catch(() => {
                HandleSignalTheInCorrectAnswer();
                element.style.transition = '.5s ease';
                element.style.backgroundColor = 'red';
            })
            .finally(() => {
                return new Promise((resolve, reject) => {

                    setTimeout(() => {
                        element.style.transition = 'none';
                        element.style.backgroundColor = oldColor;
                        HandleUnselected();
                        HandleVisibleUnselected();
                        if(isCurrentAnimalNew && element.innerText===currentCorrectAnswer)
                            resolve();
                        else reject();
                    }, 1000);
                })
            })
            .then(() => {
                if(!idOfAnimalsReadyToUnlock.includes(currentIdOfAnimalBeingAsked))
                    idOfAnimalsReadyToUnlock.push(currentIdOfAnimalBeingAsked);
            })
            .catch(() => {})
            .finally(() => {
                summary();
                isCloseAble = true;
            })
    }
});

// Hàm xử lý mở khóa thành tích
const HandleOpenAchivements = () => {
    // const func = 
    // return new Promise(resolve => {
    //     const fuc = async () => {
    //         document.querySelector('.openAchievements').style.display = 'block';
    //         await new Promise(resolve => {
    //             document.querySelector('.openAchievements').style.backgroundColor = 'sky';
    //             setTimeout(() => {
    //                 resolve();
    //             }, 2000);
    //         })
    //         await new Promise(resolve => {
    //             document.querySelector('.openAchievements').style.backgroundColor = 'blue';
    //             setTimeout(() => {
    //                 resolve();
    //             }, 2000);
    //         })
    //         document.querySelector('.openAchievements').style.display = 'none';
    //         resolve();
    //     }
    //     fuc();
    // })
    // func();
    // (new Promise(resolve => {
        // document.querySelector('.openAchievements').style.display = 'block';
        // setTimeout(() => {
        //     resolve();
        // }, 2000);
    // })).then(() => {
    //     return new Promise(resolve => {
    //         document.querySelector('.openAchievements').style.backgroundColor = 'blue';
    //         setTimeout(() => {
    //             resolve();
    //         }, 2000);
    //     })
    // }).then(() => {
    //     document.querySelector('.openAchievements').style.display = 'none';
    // })
}

// Khởi tạo audio
const initAudio = () => {
    audio = document.querySelector('#playingGame > div.containBox--button.audioAndCloseButton > div.containBox--audiobutton > i > audio');
    audio.autoplay = true;
    audio.loop = true;
    audio.currentTime = 0;
    audio.play();
    isplayaudio = true;
    document.querySelectorAll('.audioButton--cssBigger').forEach(ele => {
        ele.className = 'audioButton--cssBigger Button--cssBigger fa-solid fa-volume-high';
    })
}


// Handle turnOn/Off audio
const HandleSetturnOnOrOffAudio = () => {
    console.log('Trạng thái trước khi xét: ', isplayaudio);
    if(isplayaudio) {
        audio.pause();
        document.querySelectorAll('.audioButton--cssBigger').forEach(ele => {
            ele.className = 'audioButton--cssBigger Button--cssBigger fa-solid fa-volume-xmark';
        })
    }
    else{
        audio.play();
        document.querySelectorAll('.audioButton--cssBigger').forEach(ele => {
            ele.className = 'audioButton--cssBigger Button--cssBigger fa-solid fa-volume-high';
        })
    }
    isplayaudio = !isplayaudio;
    console.log('Trạng thái sau trước khi xét: ', isplayaudio);
}
document.querySelectorAll('.audioButton--cssBigger').forEach(ele => {
    ele.onclick = () => {
        HandleSetturnOnOrOffAudio();
    }
})

// Xử lý phát âm thanh chọn đáp án đúng
const HandleSignalTheCorrectAnswer = () => {
    let correctAudio = document.querySelector('#playingGame > div.answers > audio.audio--correct');
    if(isplayaudio) correctAudio.play();
}

// Xử lý phát âm thanh chọn đáp án sai
const HandleSignalTheInCorrectAnswer = () => {
    let inCorrectAudio = document.querySelector('#playingGame > div.answers > audio.audio--incorrect');
    if(isplayaudio) inCorrectAudio.play();
}

// Hàm Unlock các ĐV sẵn sàng để mở.
const HandleUnlockAnimalsReadyToOpened = () => {
    // Thay đổi trạng thái của động vật sẵn sàng được mở trên local
    idOfAnimalsReadyToUnlock.forEach(identity => {
        value.filter(animal => animal.id===identity)[0].trangThaiMo = true;
    });

    // Kiem tra cac dong vat da dc mo:
    (value.filter(animal => animal.trangThaiMo===true)).forEach(animaUnlocked => console.log('ĐỘNG VẬT ĐÃ ĐƯỢC MỞ: ', animaUnlocked.tenDiaPhuong));

    // Gán lại số lượng động vật đã mở
    HandleSetNumberOfAnimalOpened();
}