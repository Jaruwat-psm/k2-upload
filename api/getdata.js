export const GetAorVor = async(id, pagesize, length) => {
    try{
    const response = await fetch(`https://172.16.248.229/psm-sarabun/it_process/get?ID=${id}&draw=1&start=${pagesize}&length=${length}`);
    const data = await response.json();
    return data;
    }catch(e){
        console.error(e.message)
       return e;
    }
}

export const GetContract = async(id, pagesize, length, search) => {
    try{
        const url = `https://172.16.248.229/psm-sarabun/it_process/get_contract?ID=${id}&draw=1&start=${pagesize}&length=${length}`
        + (search ? `&search[value]=${encodeURIComponent(search)}` : '');
    const response = await fetch(url);
    const data = await response.json();
    return data;
    }catch(e){
        console.error(e.message)
       return e;
    }
}

export const GetContractFile = async (id) => {
    try {
        const response = await fetch(`https://172.16.248.229/psm-sarabun/it_process/get_contract_file?ID=${id}`);
        
        if (!response || !response.ok) { // ตรวจสอบทั้งว่ามี response และ response.ok
            throw new Error(`Network response was not ok or response is null`);
          }

        const blob = await response.blob();

        // สร้าง Blob URL
        const url = URL.createObjectURL(blob);

        // ส่งกลับ Blob URL
        return url;
    } catch (e) {
        console.error("Empty File", id);
        return null;
    }
};
