export const GetAorVor = async(id, pagesize, length) => {
    const response = await fetch(`https://172.16.248.229/psm-sarabun/it_process/get?ID=${id}&draw=1&start=${pagesize}&length=${length}`);
    const data = await response.json();
    return data;
}