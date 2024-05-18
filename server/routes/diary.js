
const express = require('express');
const router = express.Router();
const { Diary } = require("../models/Diary");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, "uploads/"); // 파일이 저장될 경로
  },
  filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`); // 파일 이름 설정
  }
});

const fileFilter = (req, file, cb) => {
  // 허용할 이미지 형식
  const allowedTypes = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
      return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// 파일 업로드 엔드포인트
router.post('/uploadImage', upload.single('file'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const filePath = req.file.path; // 저장된 파일의 경로
  return res.json({ success: true, filePath: filePath });
});

//=================================
//             Video
//=================================

//클라이언트 요청이 먼저 서버의 index.js로 와서 /api/diary 이부분은 안 써도 됨

// 파일 업로드 엔드포인트
router.post('/uploadfiles', (req, res) => {

    //비디오를 서버에 저장한다
    upload(req,res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    }) 
});         

// 일기 업로드 엔드포인트
router.post('/uploadDiary', (req, res) => {
  const diary = new Diary({
    ...req.body,
    privacy: parseInt(req.body.privacy, 10),
    category: parseInt(req.body.category, 10),
    genre: parseInt(req.body.genre, 10),
    rating: parseInt(req.body.rating, 10),
    filePath: req.body.filePath // 이미지 파일 경로 저장
  });

  diary.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});
  
// 일기 상세 정보 엔드포인트
router.post("/getDiaryDetail", (req, res) => {
    Diary.findOne({ "_id": req.body.diaryId })
      .populate('writer')
      .exec((err, diaryDetail) => {
        if (err) return res.status(400).send({ success: false, err });
        return res.status(200).json({ success: true, diaryDetail });
      });
  });
//일기 수정
  router.post('/updateDiary', (req, res) => {
    Diary.findOneAndUpdate(
      { "_id": req.body.diaryId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          privacy: req.body.privacy,
          category: req.body.category,
          genre: req.body.genre,
          rating: req.body.rating,
          filePath: req.body.filePath
        }
      },
      { new: true }, // Return the updated document
      (err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
      }
    );
  });

 // 일기 삭제 엔드포인트
router.post('/deleteDiary', (req, res) => {
  const { diaryId } = req.body;

  Diary.findOneAndDelete({ "_id": diaryId }, (err, doc) => {
      if (err) {
          return res.status(400).json({ success: false, err });
      }
      if (!doc) {
          return res.status(404).json({ success: false, message: "Diary not found" });
      }
      return res.status(200).json({ success: true, message: "Diary deleted successfully" });
  });
});


// 전체 일기 목록 엔드포인트
router.get('/getDiarys', (req, res) => {
    Diary.find()
      .populate('writer')
      .exec((err, diarys) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, diarys });
      });
  });

module.exports = router;