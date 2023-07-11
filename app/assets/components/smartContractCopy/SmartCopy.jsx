import { useState } from 'react'
import Image from 'next/image'
import copySvg from '../../icons/smart-copy2.svg'
import sliceAddress from '../../../utils/sliceAddress'
import copyText from '../../../utils/copyText'
import CustomAlert from '../CustomAlert/CustomAlert'
import styles from './smart-copy.module.scss'

export default function SmartCopy({address}) {
  const [isCopied,setIsCopied] = useState(false)

  const copyAddress = () => {
    copyText(address)
    setIsCopied(true)
  }

  return (
    <>
    <div className={styles.wrapper}>
        <div className={styles.label}>
        Smart contracts:
        </div>
        <button onClick={copyAddress} className={styles.body}>
            {sliceAddress(address)}
            <Image src={copySvg} alt='smart copy'/>
        </button>
    </div>
    <CustomAlert
    isAutoClose={true}
    isVisible={isCopied}
    handler={() => setIsCopied(false)}
    type={'success'}
    title={'Сopied!'}
    text={`You have successfully copied a smart-contract`}
    />
    </>
  )
}
