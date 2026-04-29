import React from 'react'
import Style from './customer-grievance.module.scss'
import { Icon } from '@iconify/react'

const page = () => {
  return (
    <>
        <main>
            <section className={Style.grievance_banner}>
              <div data-animation="opacity-up">
                <h2>Customer Grievances Policy</h2>
              </div>
            </section>

            <section className={Style.wrapper} style={{margin: 0}}>
              <div className={Style.grievance_content}>
                <div>
                  <h3 style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Introduction</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up"><span className={Style.bold}>PAY10 SERVICES PRIVATE LIMITED (Formerly known as BHARTIPAY SERVICES PRIVATE LIMITED)</span>, operates as a payment aggregator platform under the brand name “Pay10”. Pay10 provides technology enabled digital payment solutions to its users through various instruments and channels such as credit cards, debit cards, wallets, net banking, UPI, Pre-Paid Instruments, and QR code along with value added services through its dashboard console. Pay10’s platform is ISO 27001 Certified & PCI-DSS (v.4.0) compliant.</p>
                  <p style={{margin: '24px 0'}} data-animation="opacity-up">The activities undertaken by Pay10 fall under the purview of the "Guidelines on Regulation of Payment Aggregators - Payment Gateways (“PA PG”)" and "Master Direction on Regulation of Payment Aggregator (PA)", and Master Directions on Prepaid Payment Instruments “(PPIs)” issued by the Reserve Bank of India (“RBI”). Pay10 has received full authorization from RBI to operate as “Payment Aggregator (“PA”)-Payment Gateway”, “Pre-Paid Instrument” (“PPI”) and “Payment Aggregator-Cross Border (PA-Cross Border)” under the aforesaid guidelines/regulations.</p>
                  <p style={{margin: '0 0 24px 0'}} data-animation="opacity-up">In line with the requirements emanating from the PA Guidelines read with PA-CB and PPI regulations, Pay10 has formulated this Customer Grievances Policy(“Policy”) with the approval of the Board of Directors (“Board”), for effective grievance redressal of the merchants as well as customers. This Policy puts forth the details of complaint registrations, timeframe for resolutions, designated nodal officer and the escalation matrix.</p>
                </div>

                <div>
                  <h3 style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Objective</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Through this Policy, Pay10 aims to achieve the following objectives:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px'}}>
                    <li data-animation="opacity-up">Formulate and implement a well-defined complaint handling and grievance redressal mechanism specifically designed to cater to the requirements of the merchants and customers</li>
                    <li data-animation="opacity-up">Ensure that all the complaints are effectively addressed in accordance with the pre-defined Turnaround Time and Escalation Matrix.</li>
                    <li data-animation="opacity-up">Providing the complainants with transparent communication regarding their grievance and the ability to track their complaints.</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Key Definitions</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">For the purpose of this Policy, key definitions are as follows:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px'}}>
                    <li data-animation="opacity-up"><span className={Style.bold}>Complainant</span> means any merchant or customer availing the services of Pay10 directly or indirectly using either the Pay10 website or application and having a grievance as defined hereinunder;</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Customer</span> means the end user of the services provided by the merchants;</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Grievance" or “Complaint”</span> means any dissatisfaction expressed for deficiency of service / conduct or any act of omission / commission which causes inconvenience to the complainant but does not include feedback of non-binding nature;</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>"Jira,"</span> a widely recognized platform developed by Atlassian (atlassian.com), facilitates comprehensive tracking and management of complaint resolution processes. This supports the effective implementation of the grievance redressal policy at Pay10 Services Private Limited, ensuring alignment with internal protocols and regulatory expectations.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Merchant</span> means an individual or legal entity(ies) with whom the Company has entered into a contract (Merchant Agreement) for the purpose of providing payment solutions/services.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Nodal Officer</span> means a designated employee of the Company responsible for overseeing the grievance redressal process;</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Pay10 Shield</span> is an end-to-end digital solution designed and developed in- house by the Company that assists in the automation of various processes involved in the merchant management cycle. The features include document validation and verification, risk assessment, ongoing monitoring, generating reports etc. for improving the overall functioning;</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>PPI</span> means Prepaid Payment Instrument.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>PPI Wallet</span> means a prepaid payment instrument (PPI) wallet that holds funds deposited by the customer, which can be used for making payments or purchases as permitted under applicable regulations.</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Appointment of Nodal Officer</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Pay10 has appointed a Nodal officer who is responsible for regulatory and customer grievance handling functions of the Company.</p>
                  <p style={{margin: '24px 0 24px 0'}} data-animation="opacity-up">The contact details of the Nodal Officer are as follows:</p>
                <div style={{ overflowX: 'auto', marginTop: 24, marginBottom: 32 }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      background: '#fff',
                      minWidth: 320,
                      fontSize: 16,
                      border: '1px solid #d0d0d0',
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{
                          padding: '14px 16px',
                          border: '1px solid #d0d0d0',
                          fontWeight: 500,
                          minWidth: 180,
                          // background: '#f5f5f5',
                          verticalAlign: 'top'
                        }}>Name</td>
                        <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Mr. Manish Yadav</td>
                      </tr>
                      <tr>
                        <td style={{
                          padding: '14px 16px',
                          border: '1px solid #d0d0d0',
                          fontWeight: 500,
                          minWidth: 180,
                          // background: '#f5f5f5',
                          verticalAlign: 'top'
                        }}>Address</td>
                        <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>
                          Property Bearing No. 4, First Floor Ring Road, Lajpat Nagar - IV, New Delhi, 110024
                        </td>
                      </tr>
                      <tr>
                        <td style={{
                          padding: '14px 16px',
                          border: '1px solid #d0d0d0',
                          fontWeight: 500,
                          minWidth: 180,
                          // background: '#f5f5f5',
                          verticalAlign: 'top'
                        }}>Email Id</td>
                        <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>nodal.officer@pay10.in</td>
                      </tr>
                      <tr>
                        <td style={{
                          padding: '14px 16px',
                          border: '1px solid #d0d0d0',
                          fontWeight: 500,
                          minWidth: 180,
                          // background: '#f5f5f5',
                          verticalAlign: 'top'
                        }}>Primary Contact Number</td>
                        <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>+91 9266818866</td>
                      </tr>
                      <tr>
                        <td style={{
                          padding: '14px 16px',
                          border: '1px solid #d0d0d0',
                          fontWeight: 500,
                          minWidth: 180,
                          // background: '#f5f5f5',
                          verticalAlign: 'top'
                        }}>Secondary Contact Number</td>
                        <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>+91 7290829087</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                  <p style={{margin: '24px 0 16px 0'}} data-animation="opacity-up">The key responsibilities of the Nodal Officer include:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px', marginBottom: '24px'}}>
                    <li data-animation="opacity-up">Undertake end-to-end ownership of the customer grievance and complaint management life cycle of the Company</li>
                    <li data-animation="opacity-up">Implement the policy and take responsibility of its timely review and updation, in light of the regulatory developments</li>
                    <li data-animation="opacity-up">Ensure redressal of customer complaints within the stipulated turn-around-times (TAT) / timelines</li>
                    <li data-animation="opacity-up">Act as a single point of contact internally as well as with the regulator, for all customer grievance related matters</li>
                    <li data-animation="opacity-up">Ensure prompt and effectual adherence with regulatory instructions / changes in relation customer grievance redressal</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{margin: '32px 0 0 0'}} data-animation="opacity-up">Grievance Redressal Mechanism</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Pay10 understands the importance of customer feedback whether positive or negative in upgrading its services and being ahead of its competitors in the era of cut-throat competition. The Customer Grievance Policy designed by Pay10 is aimed at facilitating a smooth and timely resolution of merchant as well as customer complaints. Pay10 maintains all the customer grievances redressal information through Jira, the designated CRM Portal for Pay10.</p>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Some of the common scenarios that result into a complaint are as below:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px'}}>
                    <li data-animation="opacity-up">When merchant is facing issue in the integration with the Company's system.</li>
                    <li data-animation="opacity-up">When the customer is not able to do successful online transactions.</li>
                    <li data-animation="opacity-up">Settlement related issues such as when the merchant does not receive the settlement or there is a delay in the settlement or receives less settlement.</li>
                    <li data-animation="opacity-up">When customer is not able to do transactions for any specific payment mode, viz., Credit Card/Debit Card/Net Banking or may be for any particular bank.</li>
                    <li data-animation="opacity-up">When customer has any grievance against the merchant, or the products sold by the merchant.</li>
                    <li data-animation="opacity-up">When order is not generated at the time of the transaction or for refund-related queries.</li>
                    <li data-animation="opacity-up">When the customer is facing an issue in either loading or withdrawing funds from its PPI Wallet.</li>
                  </ul>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">The Customer grievance redressal framework of the Company is broadly classified under the following heads:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px'}}>
                    <li data-animation="opacity-up">Channels for complaint registration</li>
                    <li data-animation="opacity-up">Redressal process</li>
                    <li data-animation="opacity-up">Escalation Matrix</li>
                    <li data-animation="opacity-up">Turn Around Time ('TAT')</li>
                  </ul>

                  <div className={Style.channel_header} data-animation="opacity-up">
                    <h4>A. Channels for complaint registration</h4>
                  </div>
                  <p className={Style.channel_intro} data-animation="opacity-up">The customers/merchants may register their complaints/grievances through various channels listed below:</p>

                  <div className={Style.channel_block} data-animation="opacity-up">
                    <h5>For PA-PG and PA-CB related complaints:</h5>
                    <div className={Style.channel_row}><span className={Style.label}>Contact Centre :</span> <span className={Style.value}>9700497004</span></div>
                    <div className={Style.channel_row}><span className={Style.label}>Email :</span> <span className={Style.value}>info@pay10.in</span></div>
                    <div className={Style.channel_row}><span className={Style.label}>Website :</span> <a className={Style.link} href="#" rel="noreferrer">Raise Grievance</a></div>
                    <div className={Style.channel_row} style={{marginTop: 12}}>
                      <span className={Style.label}>Other Social Media :</span>
                      <div className={Style.socials}>
                        <a className={Style.social_icon} href="https://www.instagram.com/pay10india/" aria-label="Instagram" target="_blank" rel="noreferrer">
                        <Icon icon="skill-icons:instagram" width="256" height="256" />
                        </a>
                        <a className={Style.social_icon} href="https://www.linkedin.com/company/pay10india/" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                        <Icon icon="devicon:linkedin" width="128" height="128" />
                        </a>
                        <a className={`${Style.social_icon} ${Style.twitter_icon}`} href="https://x.com/Pay10India" aria-label="X" target="_blank" rel="noreferrer">
                        <Icon icon="pajamas:twitter" width="16" height="16" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className={Style.channel_block} data-animation="opacity-up">
                    <h5>For PPI-related complaints:</h5>
                    <div className={Style.channel_row}><span className={Style.label}>Contact Centre :</span> <span className={Style.value}>9211994703</span></div>
                    <div className={Style.channel_row}><span className={Style.label}>Email :</span> <span className={Style.value}>contact.us@Pay10.in</span></div>
                    <div className={Style.channel_row}><span className={Style.label}>Website :</span> <a className={Style.link} href="#" rel="noreferrer">Raise Grievance</a></div>
                  </div>

                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Upon receipt of the complaint, Pay10 will redress the same as per the process given below and within the TAT given in the ensuing paragraphs.</p>

                  <h4 style={{margin: '32px 0 16px 0', color:'var(--black)',padding: '10px', fontSize: '24px'}} data-animation="opacity-up">B. Redressal Process</h4>
                  <p style={{margin: '16px 0 0 0'}} data-animation="opacity-up">Pay10's redressal process includes the following steps:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px'}}>
                    <li data-animation="opacity-up"><span className={Style.bold}>Step 1.</span> The Complainant lodges the complaint* with the Level 1 support of Pay10 using the above-mentioned channels on Jira.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Step 2.</span> Once a complaint is raised, Jira, sends an acknowledgment to the complainant within 24 hours along with the ticket number through the same mode (email/SMS) using which the complaint was raised.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Step 3.</span> Depending upon the information (or additional information) received, the Level 1 support will redress the complaint and provide a response to the complainant.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Step 4.</span> If the complainant is not satisfied with the redressal provided, the complainant may escalate the same to Level 2 for resolution and thereafter to Level 3.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Step 5.</span> The redressal will be provided as per TAT provided hereinafter.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Step 6.</span> Once the complaint is resolved, the same will be closed in the system.</li>
                    <li data-animation="opacity-up"><span className={Style.bold}>Step 7.</span> Jira will generate a report periodically, for all the complaints redressed. This report will be used by Pay10 for review and analysis purposes.</li>
                  </ul>
                  <p style={{margin: '24px 0 0 0', fontStyle: 'italic'}} data-animation="opacity-up">*The complainant, while raising a complaint is required to briefly address the issue faced along with the following details:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px', fontStyle: 'italic'}}>
                    <li data-animation="opacity-up">Date of transaction</li>
                    <li data-animation="opacity-up">Amount of transaction</li>
                    <li data-animation="opacity-up">Transaction ID</li>
                    <li data-animation="opacity-up">Description of the problem</li>
                    <li data-animation="opacity-up">Details of email communication (screenshot) about the problem (in case of merchant) or merchant (in case of customer).</li>
                  </ul>

                  <h4 style={{margin: '32px 0 16px 0',color:'var(--black)', padding: '10px', fontSize: '24px'}} data-animation="opacity-up">C. Escalation Matrix</h4>
                  <p style={{margin: '16px 0 0 0'}} data-animation="opacity-up">In case of dissatisfaction over Pay10's response in the redressal process, the complainant may escalate the issue to bring it to the notice of higher officials of Pay10 for an amicable resolution.</p>
                  <p style={{margin: '16px 0 24px 0'}} data-animation="opacity-up">Pay10's escalation matrix is as below:</p>
                  <div style={{ overflowX: 'auto', marginTop: 24, marginBottom: 32 }}>
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: '#fff',
                        minWidth: 320,
                        fontSize: 16,
                        border: '1px solid #d0d0d0',
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>Level</th>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>Team/Designation</th>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>1</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Support Team(for PA-PG and PA-CB) Support Team (for PPI)</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>
                            <a href="mailto:info@pay10.in" style={{color: 'blue', textDecoration: 'none'}}>info@pay10.in</a> (for PA-PG and PA-CB),<br />
                            <a href="mailto:contact.us@Pay10.in" style={{color: 'blue', textDecoration: 'none'}}>contact.us@Pay10.in</a> (for PPI)
                          </td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>2</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Grievance Redressal Officer</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>
                            <a href="mailto:grievance@pay10.in" style={{color: 'blue', textDecoration: 'none'}}>grievance@pay10.in</a>
                          </td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>3</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Nodal Officer</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>
                            <a href="mailto:nodal.officer@pay10.in" style={{color: 'blue', textDecoration: 'none'}}>nodal.officer@pay10.in</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p style={{margin: '24px 0 16px 0'}} data-animation="opacity-up">If the complainant is not satisfied even after redressal provided by the Nodal Officer, the complainant may lodge the complaint with the Ombudsman as per the Integrated Ombudsman Scheme, 2021 of RBI within 30 days of redressal provided by the Nodal Officer.</p>
                  <p style={{margin: '16px 0 16px 0'}} data-animation="opacity-up">The complainant can lodge their grievance on the 'Complaint Management System' ('CMS') portal of the RBI. The contact details and procedure for approaching the Ombudsman under Integrated Ombudsman Scheme, 2021 can be referred to here <a href="https://cms.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={{color: 'blue', textDecoration: 'none'}}>https://cms.rbi.org.in/</a>.</p>
                  <p style={{margin: '16px 0 0 0'}} data-animation="opacity-up">Pay10 endeavors to redress all complaints within 30 business days of initial receipt of the complaint, subject to external dependencies, such as card networks, etc. It is the responsibility of the Level 1 officer to communicate efficiently in ways which validate, accept, and understand complaints/concerns of the user. The entire chain of communication is documented by Pay10 for future usage.</p>

                  <h4 style={{margin: '32px 0 16px 0', padding: '10px',color:'var(--black)',  fontSize: '24px'}} data-animation="opacity-up">D. Turnaround Time</h4>
                  <p style={{margin: '16px 0 24px 0'}} data-animation="opacity-up">The expected timeline for redressal of complaint at each level is tabulated below:</p>
                  <div style={{ overflowX: 'auto', marginTop: 24, marginBottom: 32 }}>
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: '#fff',
                        minWidth: 320,
                        fontSize: 16,
                        border: '1px solid #d0d0d0',
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>Level</th>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>Team/Designation</th>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>TAT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>1</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Support Team**</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>2 Working Days</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>2</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Grievance Redressal Officer</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>10 Working Days</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>3</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Nodal Officer</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>30 Working Days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p style={{margin: '16px 0 24px 0'}} data-animation="opacity-up">**Following types of complaints may be lodged with the Level 1 support:</p>
                  <div style={{ overflowX: 'auto', marginTop: 24, marginBottom: 32 }}>
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: '#fff',
                        minWidth: 320,
                        fontSize: 16,
                        border: '1px solid #d0d0d0',
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>Sr. No.</th>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>Queries</th>
                          <th style={{
                            padding: '14px 16px',
                            border: '1px solid #d0d0d0',
                            fontWeight: 600,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            fontSize: 16
                          }}>Prescribed TAT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>1</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Enquiry about transaction status</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Within 24 hours (For queries received between Monday to Friday)</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>2</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Amount debited but transaction not found</td>
                          <td rowSpan={5} style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Within 24 hours (For queries received between Monday to Friday)</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>3</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Transaction successful, but services not delivered</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>4</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Transaction successful & services also delivered, but the customer is not satisfied with the product/services and the merchant is not entertaining customer's request</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>5</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Customer asking for refund, but the merchant is not entertaining</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>6</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Refund issues</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>7</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Refund not reflecting in the customer's account</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>24 hours to 48 hours (working days) post receiving update from the concerned entity</td>
                        </tr>
                        <tr>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>8</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>Card misused or fraudulent activity</td>
                          <td style={{padding: '14px 16px', border: '1px solid #d0d0d0', verticalAlign: 'top'}}>12 hours (For queries received between Monday to Sunday)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p style={{margin: '24px 0 0 0', fontStyle: 'italic'}} data-animation="opacity-up"><span className={Style.bold}>Note:</span> The TAT mentioned above may differ on case-to-case basis.</p>

                  <p style={{margin: '32px 0 16px 0'}} data-animation="opacity-up"><span className={Style.bold}>Complaints with respect to cancellation of Order/Returns/Refunds /Fraudulent Activity.</span></p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px'}}>
                    <li data-animation="opacity-up">All the queries relating to the full or partial cancellation of orders are routed to the merchant.</li>
                    <li data-animation="opacity-up">A refund will be initiated only after undertaking reconciliation.</li>
                    <li data-animation="opacity-up">In case the order is not generated at the time of the transaction, the customer gets the credit in their bank account within 5-7 business days failing which they can contact Pay10 for refund-related queries.</li>
                    <li data-animation="opacity-up">Pay10 will always ensure that the refund of the concerned transaction, whether it's a case of fraud, order cancellation, returns, etc., will always be credited back to the transaction originating bank account, card, PPI Wallet or UPI account, by triggering the refund of the concerned order ID.</li>
                    <li data-animation="opacity-up">Pay10 will always seek for valid reasons and proper documentation, where the customer is asking for the refunds in some other account other than the transaction originating account. This request is considered only in exceptional circumstances, post doing proper due diligence of the scenario or in case of any directions form the Law Enforcement Agencies or banking authorities.</li>
                  </ul>
                  <p style={{margin: '16px 0 0 0', fontStyle: 'italic'}} data-animation="opacity-up"><span className={Style.bold}>Note:</span> The shipping or order dispatch related activities are directly managed by the merchant and the role of Pay10 is limited to directing the customer to contact the merchant and accordingly process the refund.</p>
                </div>

                <div>
                  <h3 style={{margin: '24px 0 0 0', color: 'var(--black)', padding: '10px',}} data-animation="opacity-up">Complaint review mechanism</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">In order to keep itself abreast with the best industry practices regarding customer grievances, Pay10 will periodically review the complaints received and analyse the same on the basis of the following parameters:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px'}}>
                    <li data-animation="opacity-up">Number of Escalations.</li>
                    <li data-animation="opacity-up">TAT Adherence.</li>
                    <li data-animation="opacity-up">Frequency of a particular nature of complaint.</li>
                    <li data-animation="opacity-up">Complaints escalated to the Integrated Ombudsman.</li>
                    <li data-animation="opacity-up">Any shortcoming in complaint management.</li>
                  </ul>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Based on the above analysis, suitable changes will be made in the manner a complaint is resolved and the same will be updated in this Policy. This will ensure that complaints of similar nature are resolved more effectively and efficiently in the future.</p>
                </div>

                <div>
                  <h3 style={{margin: '24px 0 0 0', color: 'var(--black)', padding: '10px',}} data-animation="opacity-up">Maintenance of Records</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Pay10 retains records of all complaints received by it, including the following:</p>
                  <ul style={{listStyle: 'disc', marginLeft: '24px'}}>
                    <li data-animation="opacity-up">Mobile no. of the Complainant,</li>
                    <li data-animation="opacity-up">Nature of complaints received,</li>
                    <li data-animation="opacity-up">Status,</li>
                    <li data-animation="opacity-up">Resolution provided and</li>
                    <li data-animation="opacity-up">Compensation awarded, if any.</li>
                  </ul>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">The above records shall be preserved by Pay10 for at least 10 years.</p>
                </div>

                <div>
                  <h3 style={{margin: '24px 0 0 0', color: 'var(--black)', padding: '10px',}} data-animation="opacity-up">Policy Review</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Pay10 will review the Policy at least once a year, or sooner, if it makes changes impacting the Pay10's business operations or due to changes in the regulatory framework.</p>
                </div>

                <div style={{marginBottom: "24px"}}>
                  <h3 style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Conclusion</h3>
                  <p style={{margin: '24px 0 0 0'}} data-animation="opacity-up">Pay10 is committed to providing the highest standards of service to its merchants and customers. This Policy aims to provide a structured mechanism for handling complaints and ensuring their timely resolution. Pay10 will review this Policy periodically and make necessary amendments to align it with regulatory requirements and best industry practices.</p>
                </div>
              </div>
            </section>
        </main>
    </>
  )
}

export default page
