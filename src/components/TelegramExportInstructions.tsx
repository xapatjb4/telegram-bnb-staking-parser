import React, {Component} from 'react';
import {log4TSProvider} from "../config/LogConfig"

const log = log4TSProvider.getLogger("tgExportInst")
class TelegramExportInstructions extends Component {
  render() {
    log.debug("render export instructions")
    return (
      <ul>
        <li>
          Download <a href="https://desktop.telegram.org/">telegram for desktop </a>
          (Note: export feature is not available on telegram from mac app store, 
          so you have to dowload the desktop version)
        </li>
        <li>
          Select BSC staking bot chat
        </li>
        <li>
          Select settings (3 dot located in the upper right corner)
        </li>
        <li>
          Select "Export Chat History" and ensure that everything is unselected
        </li>
        <li>
          Click Format and Select "Machine-readable JSON" and set path to where
          you want the file to be dowloaded
        </li>
        <li>
          Click export and wait for download to finish
        </li>
      </ul>
    )
  }
}
export default TelegramExportInstructions;