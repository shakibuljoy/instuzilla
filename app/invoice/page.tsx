'use client'

import React from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePdf';
import Image from 'next/image';
import StudentCardPDF from '../components/StudentCardPdf';

const Page = () => {

    
    return (
        <>
        <PDFViewer width={'100%'} height={600}>
            <StudentCardPDF /> 
        </PDFViewer>
        </>
    )   
};

export default Page;
