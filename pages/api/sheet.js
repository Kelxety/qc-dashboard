import { google } from "googleapis";
import keys from "../../key";

export default function handler(req, res) {
    const fullDataCong1D = [];
    const fullDataCong2D = [];
    const fullDataCong3D = [];
    const fullDataGov = [];
    const fullDataVgov = [];
    const fullDataBM1D = [];
    const fullDataBM2D = [];
    const fullDataBM3D = [];
    var rsltData = [];
    try {
        const client = new google.auth.JWT(
            keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize(async function(err, tokens) {
            if (err) {
                return res.status(400).send(JSON.stringify({error: true}));
            }

            const gsapi = google.sheets({version:'v4', auth: client});

            //NAME & RESULT Of THE CANDIDATES
            
            const qryRsltCong2D = {
                spreadsheetId: '1G-uIKWIXRuH6y2fAk060PEM8MRUbZ8iQfy2QoHQopRI',
                range: 'Sheet1!B15:G20'
            };
            const qryRsltCong3D = {
                spreadsheetId: '1G-uIKWIXRuH6y2fAk060PEM8MRUbZ8iQfy2QoHQopRI',
                range: 'Sheet1!B22:G23'
            };
            const govRslt = {
                spreadsheetId: '1G-uIKWIXRuH6y2fAk060PEM8MRUbZ8iQfy2QoHQopRI',
                range: 'Sheet1!B25:G30'
            };
            const vgovRslt = {
                spreadsheetId: '1G-uIKWIXRuH6y2fAk060PEM8MRUbZ8iQfy2QoHQopRI',
                range: 'Sheet1!B32:G36'
            };
            const bm1DRslt = {
                spreadsheetId: '1G-uIKWIXRuH6y2fAk060PEM8MRUbZ8iQfy2QoHQopRI',
                range: 'Sheet1!B38:G61'
            };
            const bm2DRslt = {
                spreadsheetId: '1G-uIKWIXRuH6y2fAk060PEM8MRUbZ8iQfy2QoHQopRI',
                range: 'Sheet1!B63:G79'
            };
            const bm3DRslt = {
                spreadsheetId: '1G-uIKWIXRuH6y2fAk060PEM8MRUbZ8iQfy2QoHQopRI',
                range: 'Sheet1!B81:G83'
            };

            //CONGRESSMAN 1ST DISTRICT
            const qryRsltCong1D = {
                spreadsheetId: '1G-uIKWIXRuH6y2fAk060PEM8MRUbZ8iQfy2QoHQopRI',
                range: 'Sheet1!B10:G13'
            };
            let dataRsltCong1D = await gsapi.spreadsheets.values.get(qryRsltCong1D);
            rsltData.push(dataRsltCong1D.data.values)
            rsltData?.map((data, index)=>{
                data?.map((name, i)=>{
                    fullDataCong1D.push({"name":name[index], "result":name[5]})
                })
            })

            //CONGRESSMAN 2ND DISTRICT
            let dataRsltCong2D = await gsapi.spreadsheets.values.get(qryRsltCong2D);
            rsltData = []
            rsltData.push(dataRsltCong2D.data.values)
            rsltData?.map((data, index)=>{
                data?.map((name, i)=>{
                    fullDataCong2D.push({"name":name[index], "result":name[5]})
                })
            })

            //CONGRESSMAN 3RD DISTRICT
            let dataRsltCong3D = await gsapi.spreadsheets.values.get(qryRsltCong3D);
            rsltData = []
            rsltData.push(dataRsltCong3D.data.values)
            rsltData?.map((data, index)=>{
                data?.map((name, i)=>{
                    fullDataCong3D.push({"name":name[index], "result":name[5]})
                })
            })

            //GOVERNOR
            let dataRsltGov = await gsapi.spreadsheets.values.get(govRslt);
            rsltData = []
            rsltData.push(dataRsltGov.data.values)
            rsltData?.map((data, index)=>{
                data?.map((name, i)=>{
                    fullDataGov.push({"name":name[index], "result":name[5]})
                })
            })

            //VICE GOVERNOR
            let dataRsltVgov = await gsapi.spreadsheets.values.get(vgovRslt);
            rsltData = []
            rsltData.push(dataRsltVgov.data.values)
            rsltData?.map((data, index)=>{
                data?.map((name, i)=>{
                    fullDataVgov.push({"name":name[index], "result":name[5]})
                })
            })

            //BOARD MEMBER 1ST DISTRICT
            let dataRsltBm1D = await gsapi.spreadsheets.values.get(bm1DRslt);
            rsltData = []
            rsltData.push(dataRsltBm1D.data.values)
            rsltData?.map((data, index)=>{
                data?.map((name, i)=>{
                    fullDataBM1D.push({"name":name[index], "result":name[5]})
                })
            })

            //BOARD MEMBER 2ND DISTRICT
            let dataRsltBm2D = await gsapi.spreadsheets.values.get(bm2DRslt);
            rsltData = []
            rsltData.push(dataRsltBm2D.data.values)
            rsltData?.map((data, index)=>{
                data?.map((name, i)=>{
                    fullDataBM2D.push({"name":name[index], "result":name[5]})
                })
            })

            //BOARDM MEMBER 3RD DISTRICT
            let dataRsltBm3D = await gsapi.spreadsheets.values.get(bm3DRslt);
            rsltData = []
            rsltData.push(dataRsltBm3D.data.values)
            rsltData?.map((data, index)=>{
                data?.map((name, i)=>{
                    fullDataBM3D.push({"name":name[index], "result":name[5]})
                })
            })

            return res.status(200).send(JSON.stringify({
                error: false, 
                Cong1stD: fullDataCong1D,
                Cong2ndD: fullDataCong2D,
                Cong3rdD: fullDataCong3D,
                Governor: fullDataGov,
                ViceGovernor: fullDataVgov,
                BMember1stD: fullDataBM1D,
                BMember2ndD: fullDataBM2D,
                BMember3rdD: fullDataBM3D,
            }));
        });
    } catch (e) {
        return res.status(400).send(JSON.stringify({error: true, message: e.message}));
    }
}