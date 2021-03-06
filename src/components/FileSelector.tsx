/*
 * Button used for uploading json files to browser for parsing
 * States transition are as follows
 *  |----------------------------+
 * No file -> Checking File -> Invalid Json
 *              +
 *              Valid Json -> Analysis -> Export Screen 
 *
 * 
 */
import React, {Component} from 'react';
import {log4TSProvider} from "../config/LogConfig";
import {TelegramExport} from "../models/Telegram-Export.model";

interface FileSelectProps {
  onValidTGExport: Function
  onInvalidTGExport: Function
}

const log = log4TSProvider.getLogger("fileSelector")
class FileSelector extends Component<FileSelectProps> {
  fileReader = new FileReader();

  constructor(props: FileSelectProps) {
    super(props);
    this.fileReader.onload = this.onFileLoaded
  }

  onFileLoaded = (e: any) => {
    log.debug("File loaded");

    let buf = e.target?.result?.toString()
    let tgExport = null;
    try {
      tgExport = this.getTGExport(buf ? buf : "");
      log.debug('Successful tgImport')
      this.props.onValidTGExport(tgExport)
      log.debug('Done with TGImport validation')
    } catch (e: any) {
      this.props.onInvalidTGExport()
      log.warn(e.toString());
    }

  }

  render() {
    log.debug("Render fileSelector");

    return (
        <input
          type="file"
          onChange={this.onFileChange}
          accept="application/json"
          data-testid="json-input"
          className="file:mt-2 file:bg-amber-300
            hover:file:bg-amber-500 focus:file:ring-4 focus:file:ring-yellow-300
            file:rounded-lg file:border-0
            file:px-5 file:py-2.5
            file:font-medium file:text-sm file:text-center"
        />
    );
  }


  onFileChange = (event: any) => {
    log.debug("File selected");
    this.fileReader.readAsText(event.target.files[0]);
  }

  getTGExport = (input: string): TelegramExport => {
    let tgExport: TelegramExport;

    if (!input) {
      throw new Error("Empty string provided")
    }

    try {
      tgExport = JSON.parse(input)
    } catch (ex) {
      throw new Error("Unparseable string provided")
    }

    return tgExport
  }
}

export default FileSelector;
