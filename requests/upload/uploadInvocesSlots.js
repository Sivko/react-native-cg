import axios from "axios";
import { getInvocesToUploadData } from "../local/getSetInvoces";
import config from "../config";
import { setLogsData } from "../local/getSetLogs";

export default async function uploadInvocesSlots() {
  const data = await getInvocesToUploadData()
  for (let i in data) {
    const resInvoice = await axios.post('https://app.salesap.ru/api/v1/deals', data[i].invoice, config).catch((e) => setLogsData({ data: e.data?.message, type: "send invoice", status: "error" }))
    setLogsData({ type: "send invoce", status: "Ok" })
    await new Promise(r => setTimeout(r, 1000))
    // console.log("resInvoice", resInvoice.data.data.id)
    for (let x in data[i].slots) {
      let tmp = { ...data[i] }
      tmp.slots[x].data.relationships.deals = {
        "data": [{
          "type": "deals",
          "id": resInvoice.data.data.id
        }]
      }
      const resSlot = await axios.post('https://app.salesap.ru/api/v1/deals', data[i].slots[x], config).catch((e) => setLogsData({ data: e.data?.message, type: "send slot", status: "error" }))
      setLogsData({ type: "send slot", status: "Ok" })
      await new Promise(r => setTimeout(r, 1000))
    }
  }
  alert("Готово");
}