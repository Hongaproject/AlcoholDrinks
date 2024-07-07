import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function SojuDetail() {
    // URL 매개변수에서 id 가져오기
    const { id } = useParams();
    // 소주 데이터를 저장할 상태
    const [sojuData, setSojuData] = useState([]);
    // 특정 소주 항목을 저장할 상태
    const [sojuItem, setSojuItem] = useState(null);

    // 엔드포인트에서 JSON 데이터 가져오기
    const fetchSojuData = async () => {
        try {
            const res = await axios.get('/db/brandsoju.json');
            setSojuData(res.data.soju);
        } catch (error) {
            console.error('소주 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        fetchSojuData();
    }, []);

    // id를 기반으로 특정 소주 항목 필터링
    useEffect(() => {
        if (sojuData.length > 0) {
            const foundItem = sojuData.find((item) => item.id === parseInt(id));
            setSojuItem(foundItem);
        }
    }, [id, sojuData]);

    return (
        <div>
            <h1>소주 상세 페이지</h1>
            {sojuItem ? (
                <div>
                    <h2>{sojuItem.name}</h2>
                    <p>제조사: {sojuItem.company}</p>
                    <img src={sojuItem.url} alt={sojuItem.name} style={{ width: '200px', height: 'auto' }} />
                </div>
            ) : (
                <p>로딩 중...</p>
            )}
        </div>
    );
}
