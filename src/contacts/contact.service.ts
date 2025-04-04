import {
    BadRequestException,
    ForbiddenException,
    Injectable,
  } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { Contact } from "../entity";
  import { Repository } from "typeorm";
  import { CreateContactDto } from "./create-contact.dto";
  import { MailService } from "../lib/resendMailService";
  import { CurrentUserService } from "../../utils/currentUser/main";
  
  @Injectable()
  export class ContactService {
    constructor(
      @InjectRepository(Contact)
      private readonly contactRepository: Repository<Contact>,
      private mailerService: MailService,
      private currentUser: CurrentUserService // Inject the MailerService
    ) {}
  
    async createContact(createContactDto: CreateContactDto): Promise<any> {
      const { email, phone, name, location } = createContactDto;
  
      const body = `
      <!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
   <meta charset="UTF-8" />
   <meta http-equiv="Content-Typ
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Location:</strong> ${location}</p>e" content="text/html; charset=utf-8" />
   <!--[if !mso]><!-- -->
   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <!--<![endif]-->
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta name="format-detection" content="telephone=no" />
   <meta name="format-detection" content="date=no" />
   <meta name="format-detection" content="address=no" />
   <meta name="format-detection" content="email=no" />
   <meta name="x-apple-disable-message-reformatting" />
   <link href="https://fonts.googleapis.com/css?family=Fira+Sans:ital,wght@0,400;0,400;0,500;0,700;0,800" rel="stylesheet" />
   <title>sss</title>
   <!-- Made with Postcards Email Builder by Designmodo -->
   <!--[if !mso]><!-- -->
   <style>
   /* cyrillic-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmojLazX3dGTP.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
           /* cyrillic */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
           /* latin-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmYjLazX3dGTP.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
           /* latin */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
                           /* cyrillic-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSxf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
           /* cyrillic */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
           /* latin-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSBf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
           /* latin */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
                           /* cyrillic-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSxf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
           /* cyrillic */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
           /* latin-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSBf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
           /* latin */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
                           /* cyrillic-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; font-display: swap; src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eSxf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
           /* cyrillic */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; font-display: swap; src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
           /* latin-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; font-display: swap; src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eSBf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
           /* latin */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; font-display: swap; src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
   </style>
   <!--<![endif]-->
   <style>
   html,
           body {
               margin: 0 !important;
               padding: 0 !important;
               min-height: 100% !important;
               width: 100% !important;
               -webkit-font-smoothing: antialiased;
           }
   
           * {
               -ms-text-size-adjust: 100%;
           }
   
           #outlook a {
               padding: 0;
           }
   
           .ReadMsgBody,
           .ExternalClass {
               width: 100%;
           }
   
           .ExternalClass,
           .ExternalClass p,
           .ExternalClass td,
           .ExternalClass div,
           .ExternalClass span,
           .ExternalClass font {
               line-height: 100%;
           }
   
           table,
           td,
           th {
               mso-table-lspace: 0 !important;
               mso-table-rspace: 0 !important;
               border-collapse: collapse;
           }
   
           u + .body table, u + .body td, u + .body th {
               will-change: transform;
           }
   
           body, td, th, p, div, li, a, span {
               -webkit-text-size-adjust: 100%;
               -ms-text-size-adjust: 100%;
               mso-line-height-rule: exactly;
           }
   
           img {
               border: 0;
               outline: 0;
               line-height: 100%;
               text-decoration: none;
               -ms-interpolation-mode: bicubic;
           }
   
           a[x-apple-data-detectors] {
               color: inherit !important;
               text-decoration: none !important;
           }
   
           .pc-gmail-fix {
               display: none;
               display: none !important;
           }
   
           .body .pc-project-body {
               background-color: transparent !important;
           }
   
           @media (min-width: 621px) {
               .pc-lg-hide {
                   display: none;
               } 
   
               .pc-lg-bg-img-hide {
                   background-image: none !important;
               }
           }
   </style>
   <style>
   @media (max-width: 620px) {
   .pc-project-body {min-width: 0px !important;}
   .pc-project-container {width: 100% !important;}
   .pc-sm-hide {display: none !important;}
   .pc-sm-bg-img-hide {background-image: none !important;}
   .pc-w620-itemsSpacings-0-30 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 15px !important;padding-bottom: 15px !important;}
   .pc-w620-itemsSpacings-10-0 {padding-left: 5px !important;padding-right: 5px !important;padding-top: 0px !important;padding-bottom: 0px !important;}
   table.pc-w620-spacing-0-0-70-0 {margin: 0px 0px 70px 0px !important;}
   td.pc-w620-spacing-0-0-70-0,th.pc-w620-spacing-0-0-70-0{margin: 0 !important;padding: 0px 0px 70px 0px !important;}
   table.pc-w620-spacing-0-0-10-0 {margin: 0px 0px 10px 0px !important;}
   td.pc-w620-spacing-0-0-10-0,th.pc-w620-spacing-0-0-10-0{margin: 0 !important;padding: 0px 0px 10px 0px !important;}
   .pc-w620-fontSize-30 {font-size: 30px !important;}
   .pc-w620-lineHeight-40 {line-height: 40px !important;}
   .pc-w620-padding-32-35-32-35 {padding: 32px 35px 32px 35px !important;}
   .pc-w620-padding-35-35-35-35 {padding: 35px 35px 35px 35px !important;}
   .pc-w620-itemsSpacings-20-0 {padding-left: 10px !important;padding-right: 10px !important;padding-top: 0px !important;padding-bottom: 0px !important;}
   
   .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
   .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
   .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
   .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;margin-left: 0 !important;}
   .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
   .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
   .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
   .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}
   
   .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}
   
   .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
   .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
   .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
   .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
   .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
   .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
   }
   @media (max-width: 520px) {
   table.pc-w520-spacing-0-0-50-0 {margin: 0px 0px 50px 0px !important;}
   td.pc-w520-spacing-0-0-50-0,th.pc-w520-spacing-0-0-50-0{margin: 0 !important;padding: 0px 0px 50px 0px !important;}
   .pc-w520-padding-27-30-27-30 {padding: 27px 30px 27px 30px !important;}
   .pc-w520-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
   }
   </style>
   <!--[if !mso]><!-- -->
   <style>
   @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjN.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjL.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7eSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf6.woff2') format('woff2'); }
   </style>
   <!--<![endif]-->
   <!--[if mso]>
      <style type="text/css">
          .pc-font-alt {
              font-family: Arial, Helvetica, sans-serif !important;
          }
      </style>
      <![endif]-->
   <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
  </head>
  
  <body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #f4f4f4;" bgcolor="#f4f4f4">
   <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color: #f4f4f4;" bgcolor="#f4f4f4" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
    <tr>
     <td align="center" valign="top">
      <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
       <tr>
        <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
         <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
          <tr>
           <td valign="top">
            <!-- BEGIN MODULE: Header 1 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
             <tr>
              <td style="padding: 0px 0px 0px 0px;">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                 <!--[if !gte mso 9]><!-- -->
                 <td valign="top" class="pc-w520-padding-27-30-27-30 pc-w620-padding-32-35-32-35" style="background-image: url('https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/22758297e9d1ec488133.webp'); background-size: cover; background-position: center; background-repeat: no-repeat; padding: 37px 40px 37px 40px; border-radius: 0px; background-color: #1B1B1B;" bgcolor="#1B1B1B" background="https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/22758297e9d1ec488133.webp">
                  <!--<![endif]-->
                  <!--[if gte mso 9]>
                  <td valign="top" align="center" style="background-image: url('https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/22758297e9d1ec488133.webp'); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: #1B1B1B; border-radius: 0px;" bgcolor="#1B1B1B" background="https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/22758297e9d1ec488133.webp">
              <![endif]-->
                  <!--[if gte mso 9]>
                  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                      <v:fill src="https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/22758297e9d1ec488133.webp" color="#1B1B1B" type="frame" size="1,1" aspect="atleast" origin="0,0" position="0,0"/>
                      <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                          <div style="font-size: 0; line-height: 0;">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                      <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                          <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <tr>
                                                  <td colspan="3" height="37" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                  <td width="40" valign="top" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                  <td valign="top" align="left">
                  <![endif]-->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td>
                     <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr class="pc-grid-tr-first pc-grid-tr-last">
                       <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-30" align="left" valign="middle" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                        <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr>
                          <td align="left" valign="middle">
                           <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                             <td align="left" valign="top">
                             </td>
                            </tr>
                            <tr>
                             <td align="left" valign="top">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td align="left" valign="top" style="padding: 0px 0px 22px 0px;">
                                 <img src="https://gameonsolution.in/game_on_logo.webp" width="125" height="32" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 125px; height: auto; max-width: 100%; border: 0;" />
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td class="pc-w520-spacing-0-0-50-0 pc-w620-spacing-0-0-70-0" align="left" style="padding: 0px 0px 105px 0px;">
                     <table class="pc-width-hug pc-w620-gridCollapsed-0" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr class="pc-grid-tr-first pc-grid-tr-last">
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                   <tr>
                    <td valign="top" align="left">
                     <div class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-40" style="line-height: 46px; letter-spacing: -0.6px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 36px; font-weight: 800; font-variant-ligatures: normal; color: #ffffff; text-align: left; text-align-last: left;">
                      <div><span>New User Alert!</span>
                      </div>
                     </div>
                    </td>
                   </tr>
                  </table>
                  <!--[if gte mso 9]>
                                                  </td>
                                                  <td width="40" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                  <td colspan="3" height="37" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </div>
                          <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                      </v:textbox>
                  </v:rect>
                  <![endif]-->
                 </td>
                </tr>
               </table>
              </td>
             </tr>
            </table>
            <!-- END MODULE: Header 1 -->
           </td>
          </tr>
          <tr>
           <td valign="top">
            <!-- BEGIN MODULE: Content 13 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
             <tr>
              <td style="padding: 0px 0px 0px 0px;">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                 <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px; border-radius: 0px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="center" valign="top" style="padding: 0px 0px 10px 0px;">
                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                       <td valign="top" align="center">
                        <div class="pc-font-alt" style="line-height: 34px; letter-spacing: -0.4px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: bold; font-variant-ligatures: normal; color: #242024; text-align: center; text-align-last: center;">
                         <div><span style="color: #242024;">Hi Team,</span>
                         </div>
                         <div><span style="color: #242024;">﻿</span>
                         </div>
                         <div><span style="font-weight: 400;font-style: normal;color: #242024;">A new user has just joined our service! Here are their details:</span>
                         </div>
                        </div>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                   <tr>
                    <td valign="top" align="center">
                     <div class="pc-font-alt" style="line-height: 28px; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #9b9b9b; text-align: center; text-align-last: center;">
                      <div><span style="font-weight: 700;font-style: normal;color: rgb(122, 122, 122);">Name:</span><span style="color: rgb(122, 122, 122);"> ${name}</span>
                      </div>
                      <div><span style="color: rgb(122, 122, 122);">﻿</span>
                      </div>
                      <div><span style="font-weight: 700;font-style: normal;color: rgb(122, 122, 122);">Email:</span><span style="font-weight: 400;font-style: normal;color: rgb(122, 122, 122);"> </span><a href="mailto:${email} target="_blank" style="text-decoration: none; color: #9b9b9b;"><span style="text-decoration: underline;font-weight: 400;font-style: normal;color: rgb(122, 122, 122);">${email}</span></a><span style="color: rgb(122, 122, 122);">﻿</span>
                      </div>
                      <div><span style="color: rgb(122, 122, 122);">﻿</span>
                      </div>
                      <div><span style="font-weight: 700;font-style: normal;color: rgb(122, 122, 122);">Date:</span><span style="font-weight: 400;font-style: normal;color: rgb(122, 122, 122);"> ${new Date().toDateString()}</span>
                      </div>
                     </div>
                    </td>
                   </tr>
                  </table>
                 </td>
                </tr>
               </table>
              </td>
             </tr>
            </table>
            <!-- END MODULE: Content 13 -->
           </td>
          </tr>
          
   </table>
   <!-- Fix for Gmail on iOS -->
   <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
   </div>
  </body
  </html>
     `;
      const bodyForNewUser = `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
   <meta charset="UTF-8" />
   <meta http-equiv="Content-Typ
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Location:</strong> ${location}</p>e" content="text/html; charset=utf-8" />
   <!--[if !mso]><!-- -->
   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <!--<![endif]-->
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta name="format-detection" content="telephone=no" />
   <meta name="format-detection" content="date=no" />
   <meta name="format-detection" content="address=no" />
   <meta name="format-detection" content="email=no" />
   <meta name="x-apple-disable-message-reformatting" />
   <link href="https://fonts.googleapis.com/css?family=Fira+Sans:ital,wght@0,400;0,400;0,500;0,700;0,800" rel="stylesheet" />
   <title>sss</title>
   <!-- Made with Postcards Email Builder by Designmodo -->
   <!--[if !mso]><!-- -->
   <style>
   /* cyrillic-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmojLazX3dGTP.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
           /* cyrillic */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
           /* latin-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmYjLazX3dGTP.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
           /* latin */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
                           /* cyrillic-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSxf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
           /* cyrillic */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
           /* latin-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSBf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
           /* latin */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
                           /* cyrillic-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSxf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
           /* cyrillic */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
           /* latin-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eSBf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
           /* latin */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
                           /* cyrillic-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; font-display: swap; src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eSxf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F; }
           /* cyrillic */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; font-display: swap; src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116; }
           /* latin-ext */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; font-display: swap; src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eSBf6Xl7Gl3LX.woff2) format('woff2'); unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; }
           /* latin */
           @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; font-display: swap; src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
   </style>
   <!--<![endif]-->
   <style>
   html,
           body {
               margin: 0 !important;
               padding: 0 !important;
               min-height: 100% !important;
               width: 100% !important;
               -webkit-font-smoothing: antialiased;
           }
   
           * {
               -ms-text-size-adjust: 100%;
           }
   
           #outlook a {
               padding: 0;
           }
   
           .ReadMsgBody,
           .ExternalClass {
               width: 100%;
           }
   
           .ExternalClass,
           .ExternalClass p,
           .ExternalClass td,
           .ExternalClass div,
           .ExternalClass span,
           .ExternalClass font {
               line-height: 100%;
           }
   
           table,
           td,
           th {
               mso-table-lspace: 0 !important;
               mso-table-rspace: 0 !important;
               border-collapse: collapse;
           }
   
           u + .body table, u + .body td, u + .body th {
               will-change: transform;
           }
   
           body, td, th, p, div, li, a, span {
               -webkit-text-size-adjust: 100%;
               -ms-text-size-adjust: 100%;
               mso-line-height-rule: exactly;
           }
   
           img {
               border: 0;
               outline: 0;
               line-height: 100%;
               text-decoration: none;
               -ms-interpolation-mode: bicubic;
           }
   
           a[x-apple-data-detectors] {
               color: inherit !important;
               text-decoration: none !important;
           }
   
           .pc-gmail-fix {
               display: none;
               display: none !important;
           }
   
           .body .pc-project-body {
               background-color: transparent !important;
           }
   
           @media (min-width: 621px) {
               .pc-lg-hide {
                   display: none;
               } 
   
               .pc-lg-bg-img-hide {
                   background-image: none !important;
               }
           }
   </style>
   <style>
   @media (max-width: 620px) {
   .pc-project-body {min-width: 0px !important;}
   .pc-project-container {width: 100% !important;}
   .pc-sm-hide {display: none !important;}
   .pc-sm-bg-img-hide {background-image: none !important;}
   .pc-w620-itemsSpacings-0-30 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 15px !important;padding-bottom: 15px !important;}
   .pc-w620-itemsSpacings-10-0 {padding-left: 5px !important;padding-right: 5px !important;padding-top: 0px !important;padding-bottom: 0px !important;}
   table.pc-w620-spacing-0-0-70-0 {margin: 0px 0px 70px 0px !important;}
   td.pc-w620-spacing-0-0-70-0,th.pc-w620-spacing-0-0-70-0{margin: 0 !important;padding: 0px 0px 70px 0px !important;}
   table.pc-w620-spacing-0-0-10-0 {margin: 0px 0px 10px 0px !important;}
   td.pc-w620-spacing-0-0-10-0,th.pc-w620-spacing-0-0-10-0{margin: 0 !important;padding: 0px 0px 10px 0px !important;}
   .pc-w620-fontSize-30 {font-size: 30px !important;}
   .pc-w620-lineHeight-40 {line-height: 40px !important;}
   .pc-w620-padding-32-35-32-35 {padding: 32px 35px 32px 35px !important;}
   .pc-w620-padding-35-35-35-35 {padding: 35px 35px 35px 35px !important;}
   .pc-w620-itemsSpacings-20-0 {padding-left: 10px !important;padding-right: 10px !important;padding-top: 0px !important;padding-bottom: 0px !important;}
   
   .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
   .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
   .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
   .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;margin-left: 0 !important;}
   .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
   .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
   .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
   .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}
   
   .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
   .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}
   
   .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
   .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
   .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
   .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
   .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
   .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
   }
   @media (max-width: 520px) {
   table.pc-w520-spacing-0-0-50-0 {margin: 0px 0px 50px 0px !important;}
   td.pc-w520-spacing-0-0-50-0,th.pc-w520-spacing-0-0-50-0{margin: 0 !important;padding: 0px 0px 50px 0px !important;}
   .pc-w520-padding-27-30-27-30 {padding: 27px 30px 27px 30px !important;}
   .pc-w520-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
   }
   </style>
   <!--[if !mso]><!-- -->
   <style>
   @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjN.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjL.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7eSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf6.woff2') format('woff2'); }
   </style>
   <!--<![endif]-->
   <!--[if mso]>
      <style type="text/css">
          .pc-font-alt {
              font-family: Arial, Helvetica, sans-serif !important;
          }
      </style>
      <![endif]-->
   <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
  </head>
  
  <body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #f4f4f4;" bgcolor="#f4f4f4">
   <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color: #f4f4f4;" bgcolor="#f4f4f4" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
    <tr>
     <td align="center" valign="top">
      <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
       <tr>
        <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
         <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
          <tr>
           <td valign="top">
            <!-- BEGIN MODULE: Header 1 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
             <tr>
              <td style="padding: 0px 0px 0px 0px;">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                 <!--[if !gte mso 9]><!-- -->
                 <td valign="top" class="pc-w520-padding-27-30-27-30 pc-w620-padding-32-35-32-35" style="background-image: url('https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/3f49feb424a78b862cc3.webp'); background-size: cover; background-position: center; background-repeat: no-repeat; padding: 37px 40px 37px 40px; border-radius: 0px; background-color: #1B1B1B;" bgcolor="#1B1B1B" background="https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/3f49feb424a78b862cc3.webp">
                  <!--<![endif]-->
                  <!--[if gte mso 9]>
                  <td valign="top" align="center" style="background-image: url('https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/3f49feb424a78b862cc3.webp'); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: #1B1B1B; border-radius: 0px;" bgcolor="#1B1B1B" background="https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/3f49feb424a78b862cc3.webp">
              <![endif]-->
                  <!--[if gte mso 9]>
                  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                      <v:fill src="https://wvtblvryxgpzqjsczvwa.supabase.co/storage/v1/object/gms-api/public/banner-img/3f49feb424a78b862cc3.webp" color="#1B1B1B" type="frame" size="1,1" aspect="atleast" origin="0,0" position="0,0"/>
                      <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                          <div style="font-size: 0; line-height: 0;">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                      <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                          <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <tr>
                                                  <td colspan="3" height="37" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                  <td width="40" valign="top" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                  <td valign="top" align="left">
                  <![endif]-->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td>
                     <table class="pc-width-fill pc-w620-gridCollapsed-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr class="pc-grid-tr-first pc-grid-tr-last">
                       <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-30" align="left" valign="middle" style="width: 50%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                        <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr>
                          <td align="left" valign="middle">
                           <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                             <td align="left" valign="top">
                             </td>
                            </tr>
                            <tr>
                             <td align="left" valign="top">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td align="left" valign="top" style="padding: 0px 0px 22px 0px;">
                                 <img src="https://gameonsolution.in/game_on_logo.webp" width="125" height="32" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 125px; height: auto; max-width: 100%; border: 0;" />
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td class="pc-w520-spacing-0-0-50-0 pc-w620-spacing-0-0-70-0" align="left" style="padding: 0px 0px 105px 0px;">
                     <table class="pc-width-hug pc-w620-gridCollapsed-0" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr class="pc-grid-tr-first pc-grid-tr-last">
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                   <tr>
                    <td valign="top" align="left">
                     <div class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-40" style="line-height: 46px; letter-spacing: -0.6px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 36px; font-weight: 800; font-variant-ligatures: normal; color: #ffffff; text-align: left; text-align-last: left;">
                      <div><span>Thank you for contact us!</span>
                      </div>
                     </div>
                    </td>
                   </tr>
                  </table>
                  <!--[if gte mso 9]>
                                                  </td>
                                                  <td width="40" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                  <td colspan="3" height="37" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </div>
                          <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                      </v:textbox>
                  </v:rect>
                  <![endif]-->
                 </td>
                </tr>
               </table>
              </td>
             </tr>
            </table>
            <!-- END MODULE: Header 1 -->
           </td>
          </tr>
          <tr>
           <td valign="top">
            <!-- BEGIN MODULE: Content 13 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
             <tr>
              <td style="padding: 0px 0px 0px 0px;">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                 <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px; border-radius: 0px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="center" valign="top" style="padding: 0px 0px 13px 0px;">
                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                       <td valign="top" align="center">
                        
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="center" valign="top" style="padding: 0px 0px 10px 0px;">
                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                       <td valign="top" align="center">
                        <a class="pc-font-alt" href="https://postcards.email/" target="_blank" style="display: block; text-decoration: none; line-height: 34px; letter-spacing: -0.4px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: bold; font-variant-ligatures: normal; color: #151515; text-align: center; text-align-last: center;">
                         <span>Hello ${name}</span> 
                        </a>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                   <tr>
                    <td valign="top" align="center">
                     <div class="pc-font-alt" style="line-height: 28px; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #9b9b9b; text-align: center; text-align-last: center;">
                      <div><span>We’ve received your message and will get back to you shortly.</span>
                      </div>
                      <div><span>&#xFEFF;</span>
                      </div>
                      <div><span>If your request is urgent, please call us at </span><a href="tel:9715131313" target="_blank" style="text-decoration: none; color: #9b9b9b;"><span style="text-decoration: underline;">9715131313</span></a><span>.</span>
                      </div>
                      <div><span>&#xFEFF;</span>
                      </div>
                      <div><span>You can also reach us via email at </span><a href="mailto:gameon.solution.317@gmail.com" target="_blank" style="text-decoration: none; color: #9b9b9b;"><span style="text-decoration: underline;">gameon.solution.317@gmail.com</span></a><span>.</span>
                      </div>
                     </div>
                    </td>
                   </tr>
                  </table>
                 </td>
                </tr>
               </table>
              </td>
             </tr>
            </table>
            <!-- END MODULE: Content 13 -->
           </td>
          </tr>
          <tr>
           <td valign="top">
            <!-- BEGIN MODULE: Footer 7 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
             <tr>
              <td style="padding: 0px 0px 0px 0px;">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                 <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px; border-radius: 0px; background-color: #0f150e;" bgcolor="#0f150e">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="center" style="padding: 0px 0px 20px 0px;">
                     <table class="pc-width-hug pc-w620-gridCollapsed-0" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr class="pc-grid-tr-first pc-grid-tr-last">
                       <td class="pc-grid-td-first pc-w620-itemsSpacings-20-0" valign="middle" style="padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 0px;">
                        <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr>
                          <td align="center" valign="middle">
                           <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                             <td align="center" valign="top">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td valign="top">
                                 <a class="pc-font-alt" href="https://www.instagram.com/gameon_solution" target="_blank" style="text-decoration: none;">
                                  <img src="https://cloudfilesdm.com/postcards/23092ff6feecf4b7e5f0aaa3e00b0a64.png" class="" width="20" height="20" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 20px; height: 20px;" alt="" />
                                 </a>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                       <td class="pc-w620-itemsSpacings-20-0" valign="middle" style="padding-top: 0px; padding-right: 15px; padding-bottom: 0px; padding-left: 15px;">
                        <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr>
                          <td align="center" valign="middle">
                           <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                             <td align="center" valign="top">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td valign="top">
                                 <a class="pc-font-alt" href="https://www.youtube.com/@GameonSolution" target="_blank" style="text-decoration: none;">
                                  <img src="https://cloudfilesdm.com/postcards/02959f0a370e76f645895898a6146bac.png" class="" width="20" height="20" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 20px; height: 20px;" alt="" />
                                 </a>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                       <td class="pc-grid-td-last pc-w620-itemsSpacings-20-0" valign="middle" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 15px;">
                        <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr>
                          <td align="center" valign="middle">
                           <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                             <td align="center" valign="top">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                               <tr>
                                <td valign="top">
                                 <a class="pc-font-alt" href="https://wa.me/9715131313" target="_blank" style="text-decoration: none;">
                                  <img src="https://cloudfilesdm.com/postcards/a5823acc6c130a4853355ad19d9e9a38.png" class="" width="20" height="20" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 20px; height: 20px;" alt="" />
                                 </a>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="center" valign="top" style="padding: 0px 0px 14px 0px;">
                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                       <td valign="top" align="center">
                        <div class="pc-font-alt" style="line-height: 143%; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: normal; font-variant-ligatures: normal; color: #febc12; text-align: center; text-align-last: center;">
                         <div><span style="font-weight: 400;font-style: normal;color: #febc12;">Seethammal Colony 2nd Cross St,</span>
                         </div>
                         <div><span style="font-weight: 400;font-style: normal;color: #febc12;">Lubdhi Colony, Alwarpet,</span>
                         </div>
                         <div><span style="font-weight: 400;font-style: normal;color: #febc12;">Chennai, Tamil Nadu 600018</span>
                         </div>
                        </div>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="center" valign="top">
                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="center" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                      <tr>
                       <td valign="top" align="center">
                        <a class="pc-font-alt" href="https://gameonsolution.in/" target="_blank" style="display: inline-block; width: 100%; text-decoration: none; line-height: 21px; letter-spacing: -0.2px; font-family: 'Fira Sans', Arial, Helvetica, sans-serif; font-size: 15px; font-weight: normal; font-variant-ligatures: normal; color: #ffffff; text-align: center; text-align-last: center;">
                         <span style="color: #ffffff;">gameonsolution.in</span> 
                        </a>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                   <tr>
                    <td align="center">
                     <table class="pc-width-hug pc-w620-gridCollapsed-0" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr class="pc-grid-tr-first pc-grid-tr-last">
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                 </td>
                </tr>
               </table>
              </td>
             </tr>
            </table>
  
   <!-- Fix for Gmail on iOS -->
   <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
   </div>
  </body>
  
  </html>
  `;
      // Check if a contact with the same email or phone already exists
      const existingContact = await this.contactRepository.findOne({
        where: [{ email }],
      });
  
      if (existingContact) {
        throw new ForbiddenException(
          "Contact with this email or phone already exists"
        );
      }
  
      const contact = this.contactRepository.create(createContactDto);
      await this.contactRepository.save(contact);
  
      // Send email notification after contact is created
      await this.mailerService.sendEmail(
        this.currentUser.get.email,
        "New user reached you",
        body
      );
      //email for new user
      await this.mailerService.sendEmail(
        email,
        "Thank you for contacting Us",
        bodyForNewUser
      );
  
      return this.contactRepository.save(contact);
    }
    async getAllContacts(
      page: number = 1,
      limit: number = 10
    ): Promise<{
      contacts: Contact[];
      unreadCount: number;
      unreadIds: number[];
      totalContacts: number;
      pageCount: number; // Add pageCount to the return type
    }> {
      try {
        // Calculate the offset for pagination
        const offset = (page - 1) * limit;
  
        // Get total contacts count
        const totalContacts = await this.contactRepository.count();
  
        // Fetch paginated contacts
        const contacts = await this.contactRepository.find({
          skip: offset,
          take: limit,
        });
  
        // Filter unread contacts
        const unreadContacts = contacts.filter((contact) => !contact.isRead);
  
        // Get unreadCount and unreadIds
        const unreadCount = unreadContacts.length;
        const unreadIds = unreadContacts.map((contact) => contact.id); // Extract IDs of unread contacts
  
        // Calculate the page count
        const pageCount = Math.ceil(totalContacts / limit); // Calculate page count
  
        return { contacts, unreadCount, unreadIds, totalContacts, pageCount };
      } catch (error) {
        throw new ForbiddenException("Error retrieving contacts");
      }
    }
  
    // Update read status for multiple contacts
    async updateReadStatus(ids: number[], isRead: boolean): Promise<Contact[]> {
      // Find the contacts with the provided IDs
      const contacts = await this.contactRepository.findByIds(ids);
  
      if (contacts.length === 0) {
        throw new BadRequestException("No contacts found for the provided IDs");
      }
  
      // Update the read status for each contact
      const updatedContacts = contacts.map((contact) => {
        contact.isRead = isRead;
        return contact;
      });
  
      try {
        // Save the updated contacts
        return await this.contactRepository.save(updatedContacts);
      } catch (error) {
        throw new ForbiddenException("Error updating contact read statuses");
      }
    }
  }
  