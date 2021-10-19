import {React, Component} from 'react';
import './Scanner.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class Scanner extends Component {
    initialState = {
        file: null,
        parsedText: [],
        showParsedText: false,
        fileUrl: null,
        animate: false
    }
    state = {...this.initialState}

    fileHandler(e) {
        let file = e.target.files[0];
        console.log(file);
        this.setState({
            file: file,
            fileUrl: URL.createObjectURL(file)

        });
    }

    handleUpload(e) {
        this.setState({
            animate: true
        })

        let data = new FormData();
        data.append('file', this.state.file);
        data.append('upload_preset', 'fbnig8dn');


        axios.post('https://api.cloudinary.com/v1_1/dqu3hk20e/image/upload', data)
        .then((response) => {
            let ocrData = {
                url : response.data.url,
            }
            //this.getOcrData(ocrData)
            axios.post('http://localhost:3001/backend', ocrData)
            .then((res)=>{
                console.log(JSON.stringify(res.data));
                this.setState({
                    parsedText: res.data,
                    animate: false,
                    showParsedText: true
                })
                //console.log(this.state.parsedText);
            })
            .catch((err)=> {
                console.log(err);
              });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    backClicked(e) {
        this.setState(this.initialState);
    }

render() {
    let displayImage = null;
    if(this.state.fileUrl != null) {
        displayImage = (
            <div className={this.state.animate ? ' box':' border border-secondary'} style= {{ display: this.state.showParsedText ? 'none' : 'block'}} >
                <img className= 'image rounded img-scan' src= {this.state.fileUrl} alt="uploaded" />
            </div>
        )
    }
    let parsedData = null;
    let parsedText = this.state.parsedText;
    if(parsedText != null && parsedText.length > 0) {
        //console.log(this.state.parsedText);
        
        parsedData = (
            <div className='row text-start'>
                {//console.log(JSON.stringify(parsedText))
                }

                {
                parsedText.map(item => {
                    console.log(item);
                    return(
                        <div className='col-md-6 mt-2'>
                            <label className='form-label'>{item.label}</label>
                            <input type="text" className='form-control' value= {item.ocr_text}/>
                        </div>
                    )
                })}
            </div>
        )
    }
    return(
        <div className='container-fluid'>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className='one'>
                <h1>Scan Easy</h1>
            </div>
            <div className='content'>
                <div className="d-flex justify-content-center">
                            {displayImage}
                </div>
                <div style= {{ display: this.state.showParsedText ? 'none' : 'block'}}>
                    <div className='col-md-12 m-3'>
                        <input type='file' className='form-control form-control-md' onChange={e => this.fileHandler(e)} placeholder='upload file'/>
                    </div>
                    <button className= 'btn btn-secondary px-4' onClick = {e => this.handleUpload(e)}>Start Scan</button>
                </div>
                <div style= {{ display: this.state.showParsedText ? 'block' : 'none'}}>
                    <h3>Profile Data</h3>
                    {parsedData}
                    <div className='col-md-12'>
                        <button className='btn btn-primary m-2'>Submit</button>
                        <Link to= '/' className='btn btn-danger px-4 m-2' onClick = {() => this.backClicked()}>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
}