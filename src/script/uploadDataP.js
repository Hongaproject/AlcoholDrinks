const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// 🔥 fetch는 Node 18+ 이상에서는 전역(global) 사용 가능하므로 import 생략

// 서비스 키 로드
const serviceAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../serviceAccountKey.json")),
);

// Firebase Admin 초기화
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// fetch로 public 폴더에서 JSON 불러오기
const fetchJson = async (name) => {
    const res = await fetch(`http://localhost:3000/db/${name}.json`);
    return res.json();
};

const uploadToFirestore = async () => {
    const datasetNames = [
        "brandsoju",
        "brandbeer",
        "brandmakgeolli",
        "brandliquor",
        "brandnew",
        "company",
    ];

    for (const name of datasetNames) {
        try {
            const data = await fetchJson(name);
            const docRef = db.collection("brandlistdata").doc(name);
            await docRef.set({ data });
            console.log(`✅ ${name}.json 업로드 완료`);
        } catch (error) {
            console.error(`❌ ${name}.json 업로드 실패`, error);
        }
    }
};

uploadToFirestore();
