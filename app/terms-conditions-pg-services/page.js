import React from "react";
import Style from "../terms-of-service/terms_and_conditions.module.scss";

const contentHtml = `
  <h3>TERMS AND CONDITIONS</h3>

  <h3>1. DEFINITIONS AND INTERPRETATION</h3>
  <p class="bold">1. Definitions</p>
  <p>In this Agreement, unless the context otherwise requires, the following words and expressions shall bear the meanings ascribed to them below:</p>

  <p><span class="bold">“Act”</span> means the Payment and Settlement Systems Act, 2007 or any other act as may be applicable and the rules, regulations, guidelines and notifications framed and/or issued by the RBI thereunder.</p>
  <p><span class="bold">“Acquirer”</span> means bank, financial institution, Card Association, or a payment system provider who is licensed by the RBI under the Act to acquire and Authenticate a Transaction.</p>
  <p><span class="bold">“Agreement”</span> means this document containing the Terms and Conditions along with the Annexures attached hereto.</p>
  <p><span class="bold">“Applicable Law”</span> means any statute, circular, law, regulation, ordinance, rule, judgment, notification, order, decree, bye-law, permits, licenses, approvals, consents, authorizations, government approvals, directives, guidelines, requirements or other governmental restrictions, or any similar form of decision of, or determination by, or any interpretation, policy or administration, having the force of law by, any Governmental Authority having jurisdiction over the matter in question including but not limited to the RBI or National Payment Corporation of India, Digital Personal Data Protection (DPDP) Act, Information Technology Act, whether in effect as of the date of this Agreement or thereafter.</p>
  <p><span class="bold">“Authenticate”</span> or <span class="bold">“Authentication”</span> means the process by which the Customer’s identification is authenticated by the Acquirer.</p>
  <p><span class="bold">“Authorisation”</span> means the process by which the Issuer and/or the relevant Card Association electronically or otherwise convey the approval of the Customer’s payment with respect to a Transaction.</p>
  <p><span class="bold">“Business Day”</span> means any day of the week (excluding 2nd and 4th Saturdays, Sundays and any day which is a public holiday for the purpose of Section 25 of the Negotiable Instruments Act, 1881 (26 of 1881)), on which the banks are open for settlement of transactions in accordance with RBI guidelines.</p>
  <p><span class="bold">“Card Association”</span> or <span class="bold">“Card Scheme”</span> means Visa, MasterCard, Visa Electron, Maestro, Diners, American Express or any other card association as may be specified by Pay10 from time to time;.</p>
  <p><span class="bold">“Cardholder”</span> means the Customer intending to make the payment using a valid card issued by Card Scheme Services.</p>
  <p><span class="bold">“Card Scheme Rules”</span> means the rules framed by Card Association.</p>
  <p><span class="bold">“Card Scheme Services”</span> means the services offered by Card Association, enabling secure electronic payments using credit, debit, or prepaid cards.</p>
  <p><span class="bold">“Chargeback”</span> means an approved and settled Transaction that an Issuer, upon receiving a chargeback request from a Customer, reverses to an Acquirer for the Transaction value to be ultimately reversed to such Customer.</p>
  <p><span class="bold">“Customer”</span> means any person who is availing services or products of the Merchant using Services via Merchant to make the payment/remittance.</p>
  <p><span class="bold">“Effective Date”</span> means the date of accepting the terms and conditions of this Agreement by the Merchant through any appropriate mode.</p>
  <p><span class="bold">“Escrow Account”</span> means such account as maintained by Pay10 with a scheduled commercial bank for the purpose of receiving the amounts due from the Customers and effecting settlements to the Merchant Bank Accounts in terms of the Applicable Law.</p>
  <p><span class="bold">“Escrow Bank”</span> means scheduled commercial bank with which Pay10 has maintained an Escrow Account in accordance with Applicable Law, for the purpose of settlement to the Merchant.</p>
  <p><span class="bold">“Governmental Authority”</span> means any central or state government or other political subdivision thereof and any entity, including any regulatory or administrative authority or court, exercising executive, legislative, judicial, regulatory or administrative or quasi-administrative functions of or pertaining to government.</p>
  <p><span class="bold">“Intellectual Property Rights”</span> means all rights in inventions, patents, copyrights, design rights, database rights, trademarks and trade names, service marks, trade secrets, know-how and other intellectual property rights (whether registered or unregistered) and all applications and rights to apply for any of them anywhere in the world that apply to the Platform;</p>
  <p><span class="bold">“Issuer”</span> means (i) a bank or financial institution that offers and/or issues cards on behalf of the Card Association; (ii) a bank that offers accounts; or (iii) an entity authorised under the Act to issue prepaid payment instruments.</p>
  <p><span class="bold">“Letter of Declaration”</span> means the letter submitted by the Merchant to Pay10 through a third party having the Merchant details along with KYC documents and confirmation on acceptance of this Agreement.</p>
  <p><span class="bold">“Merchant”</span> means any person or entity executing this Agreement with Pay10 for availing Pay10 Services, the particulars of whom are captured during the Onboarding process in the Letter of Declaration.</p>
  <p><span class="bold">“Pay10”</span> means Pay10 Services Private Limited (formerly known as Bhartipay Services Private Limited), a company duly incorporated under the Companies Act, 2013, having its registered office at 1st Floor, Building No.4, Ring Road, Lajpat Nagar - IV, South Delhi, Delhi, 110024, India.</p>
  <p><span class="bold">“Platform”</span> means the online portal of Pay10 that would enable the Merchant to manage and avail the Services.</p>
  <p><span class="bold">“RBI”</span> means the Reserve Bank of India.</p>
  <p><span class="bold">“Scheme Marks”</span> means the logos or symbols used by card networks (such as Visa, Mastercard, or American Express) which appears on the cards.</p>
  <p><span class="bold">“Services”</span> means payment gateway and aggregation services provided by Pay10 in relation to facilitation and settlement of online payments by providing multiple payment options, as more particularly set out in Annexure I of this Agreement.</p>
  <p><span class="bold">“Transaction”</span> means a financial transaction conducted by the Customer online for availing services and/or purchasing products.</p>

  <p class="bold">2. Interpretation</p>
  <p>Unless the context otherwise requires in this Agreement:</p>
  <ul>
    <li>words importing the singular include the plural and vice versa, and reference to a gender includes a reference to the other genders;</li>
    <li>reference to Applicable Laws or any legislation or to any provision thereof, shall include legislation or laws as may, from time to time, be enacted, amended, supplemented or re-enacted;</li>
    <li>the headings in this Agreement are for reference only and shall not affect the interpretation or construction hereof;</li>
    <li>the terms ‘include’ and ‘including’ shall mean ‘include/including without limitation’ and shall be construed without limitation; and</li>
    <li>the annexures form an integral part of this Agreement and shall have effect as if set out in full in the body of this Agreement. Any reference to this Agreement includes reference to the annexures.</li>
  </ul>

  <h3>2. SERVICES</h3>
  <p><span class="bold">3.</span> In order to avail the Services, the Merchant shall be required to register on the Platform by providing all necessary documents and information which may be reasonably requested by Pay10. Merchant has agreed to provide such additional documents as may be required by Pay10, from time to time, for the provision of the Services to the Merchant. Pay10 shall verify the veracity and genuineness of such documents and information provided by the Merchant as per the KYC/ AML rules and regulations of Banks. On verification of the information and documents and subject to the terms of the Agreement, Pay10 may enable the Merchant to access the Platform in order to accept and manage the payments received from the Customers, and approve settlements to the Merchants.</p>
  <p><span class="bold">4.</span> Pay10 shall provide the Services, enabling the Merchant to accept payments from the Customers, using the payment links in the Escrow Account, and shall further facilitate settlements of such collected payments to the designated bank account of the Merchant declared by the Merchant in the Letter of Declaration, as per the terms of this Agreement.</p>
  <p>It is clarified that Pay10 may allow the Merchant to accept payments from its Customers upon completion of the minimum KYC requirements. However, the settlement of such collected payments will only be processed once the full KYC requirements are completed within the timeframe communicated to the Merchant. Failure to comply within the stipulated timeframe shall entitle Pay10 to refund the collected amounts to the respective Customers at the sole risk and consequences of the Merchant.</p>

  <h3>3. ROLES AND RESPONSIBILITIES</h3>
  <p><span class="bold">5.</span> Pay10 shall:</p>
  <ul>
    <li>grant the Merchant a non-exclusive, non-assignable, non-sublicensable and revocable license to use the Platform and to use the payment links, which can be shared with the Customers for the collection of payments;</li>
    <li>enable acceptance of payments from the Customer in the Escrow Account maintained by it in accordance with the Applicable Law;</li>
    <li>debit such amounts or funds, including but not limited to Service Fees, authorized refunds, Chargebacks etc., as may be permitted in accordance with the terms of this Agreement;</li>
    <li>appoint a Grievance Redressal Officer responsible for addressing issues raised by the Merchant for resolving Merchant complaints. The details of the Grievance Redressal Officer may be accessed at Grievance Policy mentioned on the Pay10’s website; and</li>
    <li>keep the Merchant updated at all times of the details of the Services provided under this Agreement.</li>
  </ul>

  <p><span class="bold">6.</span> The Merchant shall:</p>
  <ul>
    <li>ensure that no illegal, offensive or prohibited items that are listed in Annexure II and/or are not in compliance with Applicable Laws shall be offered or sold by the Merchant;</li>
    <li>ensure that Pay10 Services shall only be used for the sale of goods/ render services declared in the Letter of Declaration;</li>
    <li>ensure that the payment link should be kept confidential at all times, and not be shared with/ used by anyone apart from the customer;</li>
    <li>ensure that the payment link should not be used to make transactions on behalf of any other entity, except the Merchant;</li>
    <li>ensure that the payment link should not be used to sell any illegal or banned goods or srervices;</li>
    <li>ensure that it shall comply with the Applicable Laws including applicable guidelines, rules, regulations issued by the RBI, Acquirer and/or Card Associations. Merchant agrees and understands that Pay10 reserves the right to suspend the Services until such time that Merchant conforms to all Applicable Laws;</li>
    <li>be solely responsible for the accuracy of all information and/or validity of the prices and any other charges and/or other information relating to the products or services offered by the Merchant;</li>
    <li>resolve all Customer’s disputes and provide necessary assistance to the Acquirer, Card Associations and/or Pay10 (if required) to deal and resolve such disputes at its own cost;</li>
    <li>ensure that the Merchant does not sell any libelous, defamatory, obscene, pornographic or profane material goods or services that may cause harm to Pay10, the Acquirer, Card Associations and/or any other third party;</li>
    <li>keep confidential, all information submitted by the Customers. The Merchant shall not store/save any Customer’s card details/credentials and such related data within its database or any other server accessed irrespective of the Merchant being PCI-DSS compliant or otherwise;</li>
    <li>not have any malafide intention of duping Customers and shall not sell any fake or counterfeit products;</li>
    <li>provide Pay10 or Acquirer all information and documents including invoice, purchase orders, delivery challan or any other proofs, within three(3) days of receiving such request, as may be required to evidence the Transactions carried out using Pay10 Services;</li>
    <li>alone be responsible and liable for all activities in relation to purchase, sale or provision of any goods or services using Pay10 Services;</li>
    <li>provide the Customer with all warranty, after sales service and/or other statutory privileges as are generally made available by any entity similar to the Merchant;</li>
    <li>provide a commercially reasonable level of customer support to Customers with respect to sales or services rendered by the Merchant;</li>
    <li>undertake all acts necessary to be compliant with the provisions of all Applicable Laws including but not limited to Act, the RBI Guidelines on Regulation of Payment Aggregators and Payment Gateways, Prevention of Money Laundering Act, 2002, and RBI guidelines on Know Your Customer (KYC) / Anti-Money Laundering (AML) / Combating Financing of Terrorism (CFT);</li>
    <li>undertake that in the event of a security incident involving security breach of any of the customer information, the Merchant shall promptly notify Pay10 without undue delay, and in any event, within 4 hours of becoming aware of the breach. The notification shall include sufficient details to enable Pay10 to meet its obligations under the relevant Applicable Law, including reporting to regulators and notifying affected individuals, if required. The Merchant shall also assist Pay10 in mitigating any adverse effects of the breach; and</li>
    <li>assist, and share documents or information with Pay10, as may be requested by Pay10, in case of any proceedings or inquiry by any Governmental Authority.</li>
  </ul>

  <h3>4. REJECTION AND REFUND</h3>
  <p><span class="bold">7.</span> Notwithstanding anything contained anywhere in this Agreement, Pay10 reserves the right to reject payments prior to Authorisation or suspend the transaction, in the following situations:</p>
  <ul>
    <li>the Transaction is for any reason unlawful, unenforceable, doubtful or erroneous;</li>
    <li>the Transaction made through a card outside the territory authorised for the use of the card;</li>
    <li>Transaction not having obtained a necessary Authorisation/Authentication as required to be obtained in terms of this Agreement and the Applicable Law;</li>
    <li>in the event the specific Transaction is found to be suspicious;</li>
    <li>the payment is rejected by Acquirer.</li>
  </ul>

  <p><span class="bold">8.</span> The payments can be rejected by the Acquirer or Issuer post Authorisation and prior to settlement in the following circumstances:</p>
  <ul>
    <li>in case a Transaction is debited more than once from Customer’s bank account;</li>
    <li>where Authorisation for a Transaction has been cancelled;</li>
    <li>in case the Transaction is found to be fraudulent or invalid; or</li>
    <li>the payment is rejected by Acquirer due to any other reason.</li>
  </ul>

  <p><span class="bold">9.</span> It is acknowledged and understood by the Merchant that in the event of any refund/ reversal of any transaction as per as per the terms of this Agreement, the refunded amount shall be recovered by Pay10 from the settlement funds of Merchant. In the event the settlement funds of any given day or subsequent days are insufficient to recoup the amount refunded/ reversed, Pay10 shall make a claim on the Merchant for such Transaction Amount, payable within two (2) days of receiving the claim. It is further agreed that Pay10 is entitled to reject/ withhold any refund request on account of insufficient balance in the settlement funds, solely at the risks, costs and consequences of the Merchant.</p>
  <p><span class="bold">10.</span> It is further acknowledged and agreed by the Merchant that Pay10 is entitled to the Service Fees for all the transactions submitted on Pay10 portal irrespective of any refund of transaction.</p>

  <h3>5. CHARGEBACK</h3>
  <p><span class="bold">11.</span> In the event, the Acquirer or the Issuer notifies Pay10 about the receipt of a Chargeback from a Customer, the same shall be, forthwith, informed to the Merchant by Pay10 and Pay10 shall debit the amount disputed by the Customer to the Merchant from the ongoing due settlement to the Merchant Account. The agreed ratio of CTS/FTS across industry is 1%.</p>
  <p><span class="bold">12.</span> The Merchant shall be entitled to dispute the Chargeback request, and furnish documents and information pertaining to the Transaction, within 3 (three) working days of the Merchant receiving the notification about the Chargeback request from Pay10, in order to substantiate:</p>
  <p>(a) the completion of the aforesaid Transaction; and/or</p>
  <p>(b) delivery of goods / services sought by the Customer pursuant to the said Transaction,</p>
  <p><span class="bold">13.</span> The Merchant agrees and acknowledges that the Merchant shall not further dispute any debit to the Merchant’s bank account for the disputed amount if:</p>
  <p>(a) the Merchant is unable to furnish reasonable information as stipulated in the Clause 5.2 above; or</p>
  <p>(b) the Issuer is not satisfied with such information furnished by the Merchant.</p>
  <p><span class="bold">14.</span> It is understood and acknowledged by the Merchant that the Acquirer may either refund the complete transaction amount and/or may levy a penalty on the Merchant in case of breach of Chargeback to sales(CTS) and Fraud to sales(FTS) ratio or if the Merchant is not compliant to the Applicable Law. Any amount debited to Pay10 by the Acquirer pursuant to this Clause shall be recovered by Pay10 from the Merchant's daily settlement funds.</p>
  <p>It is further understood and acknowledged by the Merchant agrees that, from time to time, Pay10 may require the Merchant to provide security deposits amounts, in order to mitigate Pay10’s reasonable concerns regarding the risk of loss arising from varying circumstances related to transactions conducted through Pay10 Processing Mechanism. The amount of such security deposit shall be mutually decided; however, in the event that the parties fail to reach a consensus on the amount of the security deposit within seven (7) days, Pay10 reserves the right to terminate this Agreement.</p>
  <p><span class="bold">15.</span> In case notice of termination is issued by either party as per the terms of this Agreement, Pay10 reserves the right to withhold from each settlement made during the Notice period, an amount calculated on the basis of average chargeback amount received in the last financial year, for a period of 180 days from the date of termination of this Agreement. The amount so withheld shall be used for the settlement of Chargeback requests. The unutilized amount, if any, at the end of 180 days from the date of termination of this Agreement shall be transferred to the Merchant forthwith.</p>
  <p><span class="bold">16.</span> Notwithstanding anything contained in the sub clause 5.6, if the amount withheld pursuant to sub clause 5.6 is insufficient to settle chargeback amounts received during the period of 180 days from the date of termination of this Agreement, then Pay10 is entitled to issue a debit note seeking reimbursement of the Chargeback amount. It is agreed that the Merchant shall reimburse the Chargeback amount within 30 days of receiving the debit note.</p>

  <h3>6. SETTLEMENT OF TRANSACTIONS</h3>
  <p><span class="bold">6.1</span> In the normal course of business, remittance of funds by the Acquirers into Pay10 Escrow Account, is done on the first Business Day following the day that Pay10 generates, transmits or otherwise provides an approval notice in respect of a payment request.</p>
  <p><span class="bold">6.2</span> Subject to the provisions contained in Clause 6.5, Pay10 Escrow Bank will thereafter remit monies into the designated bank account of Merchant as per the settlement schedule outlined in Annexure III of this Agreement.</p>
  <p><span class="bold">6.3</span> The amount of Settlement funds remitted to Merchant, on each Day (“Settlement Amount”) shall equal the following:</p>
  <p>(a) The aggregate Transaction amounts of all unsettled Transactions successfully authorized during the period relevant to the scheduled settlement time, in accordance with Clause 6.2, less</p>
  <p>(b) the aggregate Transaction Fee applicable to all Transactions settled pursuant to Clause 6.3(a) above; less</p>
  <p>(c) the aggregate amount of all unadjusted Reversal Transactions, since the immediately preceding Business Day in respect of previously successfully Authorized and duly settled Transactions; less</p>
  <p>(d) any Chargebacks of Transactions (unless already deducted from the Settlement Amount earlier); less</p>
  <p>(e) any overpayment made by Pay10 Escrow Bank in any of the earlier Settlements due to any computational or system errors or otherwise; less</p>
  <p>(f) any other sums due from or payable by Merchant under this Agreement.</p>
  <p><span class="bold">6.4</span> To the extent that the Settlement Amount for any day is negative, Pay10 shall be entitled to recoup the balance amounts from any amounts due to Merchant, including from the Settlement funds of subsequent days.</p>
  <p><span class="bold">6.5</span> Pay10 is only obliged to provide Settlement of Transactions for which due funds have been remitted by the Acquirer or the relevant Card Scheme to the Escrow Bank. The Merchant acknowledges and agrees that Pay10 will not compensate the Merchant for the late or non-performance, insolvency or bankruptcy of the Acquirer or Scheme Owner or Escrow Bank due to which the Merchant receives late Settlement or no Settlement at all for processed Transactions.</p>

  <h3>7. FEES, FINES AND TAXES</h3>
  <p><span class="bold">17.</span> In consideration of the Services, the Merchant agrees to pay Pay10 such fees as may be applicable in terms of Annexure I of this Agreement (“Service Fees”). The applicable Service fees shall be deducted by Pay10 from the Merchant’s ongoing settlement to their Account in respect of each completed Transaction on the Platform.</p>
  <p>Pay10 reserves the right to revise the Service Fees periodically and the Parties may mutually agree to add to or amend the Services or any other details in Annexure I, provided that such revision, addition or amendment is in writing.</p>
  <p><span class="bold">2.</span> Pay10 shall be entitled to charge and/or withhold applicable taxes on the Merchant as may be applicable under the Applicable Law from time to time.</p>
  <p><span class="bold">3.</span> Pay10 shall be entitled to debit the amount equivalent to any fines, penalties and/ or other charges imposed on Pay10 by Acquirer, Scheme Owner or any other person resulting from Chargebacks and any other fees or fines imposed with respect to acts or omissions of Merchant.</p>
  <p><span class="bold">4.</span> Notwithstanding anything to the contrary hereunder, the Merchant shall forthwith compensate/ reimburse Pay10 for any loss or penalty borne by Pay10 due to any suspected illegal, fraudulent or improper activity by the Merchant or the Merchant’s Customer. The Merchant hereby agrees to keep Pay10 indemnified against such penalty, if imposed, and has further agreed to pay/ reimburse Pay10, the aforementioned penalty, within 30 days from the date when it becomes due and payable by Pay10.</p>
  <p><span class="bold">7.5</span> Pay10 is hereby authorised and entitled to debit the disputed amount, from any amount due and payable to Merchant in terms of this Agreement. The Merchant agrees and undertakes to execute all authorizations and documents as may be required in this regard by Pay10 from time to time. Pay10 further reserves the right to debit the amounts erroneously paid in excess to the Merchant.</p>

  <h3>7. AUDIT</h3>
  <p><span class="bold">1.</span> The Merchant shall be solely responsible for (a) compiling and retaining records of all Transactions and other data; and (b) reconciling such information that is associated with the Customers.</p>
  <p><span class="bold">2.</span> Pay10, Acquirer and any relevant regulatory authority has the right, either on its own or by engaging a third-party, to conduct background and antecedent check of the Merchant, on-site audits and to examine any records, invoices and/or other data or documents of the Merchant that are necessary to determine Merchant’s compliance with this Agreement and Applicable Law.</p>

  <h3>8. REPRESENTATIONS AND WARRANTIES</h3>
  <p><span class="bold">3.</span> Each Party hereby represents and warrants to the other Party that:</p>
  <ul>
    <li>it holds valid and subsisting licenses, registrations, approvals and consents as may be required for conducting its business and performing its obligations under this Agreement;</li>
    <li>it has the requisite power and authority to execute, deliver and perform its obligations under this Agreement; and that this Agreement, when executed, shall have been duly and validly authorized, executed and delivered by it;</li>
    <li>its obligations hereunder constitute legal, valid, binding and enforceable obligations;</li>
    <li>the execution and performance of this Agreement does not breach its organizational documents or any Applicable Law, provisions of any contract or order of any Governmental Authority;</li>
    <li>it shall comply with all Applicable Laws including but not limited to the Information Technology Act, 2000, the Prevention of Money Laundering Act, 2002 and regulations framed by the RBI; and</li>
    <li>it shall not, directly or indirectly, make or offer any payment, gift or other advantage which is intended to, or does, influence or reward any Governmental Authority.</li>
  </ul>

  <p><span class="bold">4.</span> The Merchant hereby represents and warrants to Pay10 that:</p>
  <ul>
    <li>it shall use Pay10 Services exclusively for the sale of goods/ rendering services, as declared by the Merchant in the Letter of Declaration during the Onboarding Process.</li>
    <li>It shall keep the payment link confidential and will not share it with any other entity.</li>
    <li>It shall use the payment link only for its own transactions.</li>
    <li>It should not use the payment link for the sake of any illegal goods or services.</li>
    <li>it is competent to enter into legally binding contracts under the Indian Contract Act, 1872 and is not barred or otherwise legally prohibited from using or accessing the Services.</li>
    <li>the information provided by it is accurate, completed and up-to-date at all times. It is clarified that in the event the Merchant provides inaccurate, untrue, or incomplete information, Pay10 shall reserve the right to suspend the Services forthwith until correct and updated information is furnished by the Merchant;</li>
    <li>it is legally authorized to carry on business and has all necessary permits and licenses to carry out its business;</li>
    <li>it has consented to Pay10 for collection of a copy of Aadhaar card of its relevant personnels. The Merchant confirms that it has obtained prior consent from such personnels for sharing such information with Pay10. The Merchant understands that the copy of Aadhaar card shall be kept and stored by Pay10 only in a manner permitted by applicable law and shall be used by Pay10 to verify the identity and other details provided by the Merchant herein.</li>
    <li>each Transaction represent a bona fide sale of products and/ or services by the Merchant to the Customers. It shall not sell any goods/ service which fall outside the description of its business without prior written approval of Pay10;</li>
    <li>it does not sell fake or counterfeit or prohibited products to the Customers;</li>
    <li>it shall not use the Services, directly or indirectly, for any banned/ illegal/ fraudulent activity;</li>
    <li>it shall not submit any transaction on behalf of any third party entity other than that agreed under this Agreement.</li>
    <li>it shall intimate Pay10 as soon as practicable upon altering its website content materially.</li>
    <li>it shall not change the part of its business or its business model which is related to this Agreement.</li>
    <li>it shall use the Services for facilitating payments only in India; and</li>
    <li>it shall not under any circumstances store customer’s payment/ financial data. It is further clarified that the Merchant may however store limited data (excluding customer card and other financial data) solely for the purpose of Transaction tracking under this Agreement provided such required limited information shall be stored in compliance with adequate security standards applicable under the Applicable Laws.</li>
  </ul>

  <p><span class="bold">9.3.</span> With respect to Card Scheme Services, if availed by the Merchant, the Merchant hereby acknowledges, understands and agrees:</p>
  <p>(a) that the Card Schemes are the sole and exclusive owner of the Scheme Marks.</p>
  <p>(b) that the Card Schemes may at any time, immediately and without advance notice, prohibit the use of any of the Scheme Marks for any reason.</p>
  <p>(c) that the Merchant is required to inform a Cardholder, prominently and unequivocally, of its identity at all points of interaction, so that the Cardholder can readily distinguish the Merchant from any other third party, such as a Supplier of products or services to the Merchant.</p>
  <p>(d) that it shall refrain from imposing any minimum or maximum Transaction values or discriminating against the use of Cards in any way and/ or splitting a transaction into two or more transactions;</p>
  <p>(e) that it shall not accept any transaction using any card issued in its name or related to the nominated bank account or of a partner, director or other officer of its business or of the spouse or any member of the immediate family or household of any such person.</p>
  <p><span class="bold">9.4.</span> Both the Parties undertakes and confirms that the representations made herein shall remain true, accurate and valid for the entire duration of this Agreement.</p>

  <h3>10. DISCLAIMER</h3>
  <p><span class="bold">1.</span> Notwithstanding anything mentioned in this Agreement, Pay10 does not make any representations, express or implied about the availability or suitability of the Services for any purposes other than for the purpose agreed under this Agreement.</p>
  <p><span class="bold">2.</span> Merchant acknowledges and understands that the information provided by Pay10 in the performance of its Services under this Agreement is not generated by Pay10, but that it is merely transmitting the data as received from the Acquirers/ other partners. Further, Pay10 will make all reasonable efforts to provide uninterrupted Service subject to down time due to circumstances beyond the control of Pay10 and regular maintenance. The Merchant acknowledges that the Services are of complex nature and require the intervention and assistance of a number of parties. The Merchant acknowledges and agrees that Pay10 shall only be liable for acts or omissions which are solely and directly attributable to Pay10.</p>
  <p><span class="bold">3.</span> Pay10 may suspend the use of or access to the Platform from time to time upon providing prior written notice (a) to perform necessary routine or emergency maintenance (b) to implement service changes and upgrades to the Platform; and immediately (c) to mitigate issues caused by any acts or omissions of third parties or issues with any internet infrastructure or (d) if the Platform is, in Pay10’s sole opinion, being misused.</p>

  <h3>10. LIMITATION OF LIABILITY</h3>
  <p><span class="bold">11.1</span> It is agreed by both the Parties and Pay10 is a payment facilitator and in no event shall be liable for special, incidental, indirect, consequential, exemplary or punitive damages of any kind or character, including but not limited to loss of profits or revenues, loss of product and the like under any theory of contract, tort, strict liability, statute or any other legal or equitable principle or otherwise, arising out of or in any manner connected with this Agreement and regardless of whether Pay10 has been informed of, or might have anticipate, the possibility of such damages.</p>
  <p><span class="bold">11.2</span> The aggregate liability of Pay10 under this Agreement shall not exceed an amount equal to Pay10’s fees received or receivable in respect of transactions settled during the one month period prior to the date of claim.</p>

  <h3>11. DATA OWNERSHIP, CONFIDENTIALITY AND INTELLECTUAL PROPERTY RIGHTS</h3>
  <p><span class="bold">4.</span> Each Party accepts for all purposes that any trademarks, logos, service marks, trade names or identifying slogans (“Intellectual Property”) affixed or used by either Party or any of its Affiliates, whether registered or not, constitute the exclusive property of owning Party and cannot be used by the other Party without the prior written consent of owning Party. The Merchant acknowledges that all right, title and interest in and to the Platform and upgrades, updates, derivative works and other improvements to the Platform, including without limitation, all Intellectual Property Rights and Confidential Information, are vested, and shall remain vested, in Pay10. The Parties agree and understand that nothing in this Agreement shall act to operate as an assignment or transfer of any of such rights in the Platform to the Merchant. Provided that the Merchant shall own and will at all times retain all rights, title and interest in and to all of the data that is uploaded on the Platform by the Merchant or its users.</p>
  <p><span class="bold">5.</span> For avoidance of doubt, "Confidential Information" shall mean, without limitation, all non-public, proprietary, or sensitive information that a reasonable person would understand to be confidential. Confidential Information shall include all Personal Data and Personally Identifiable Information (PII) as defined under applicable data protection and privacy laws, including but not limited to names, contact information, identification numbers, account credentials, financial information, or any other data that can be used to identify an individual directly or indirectly and any technical, business, client or proprietary information disclosed between the Parties, directly or indirectly, including, but not limited to, information regarding business strategies and practices, methodologies, trade secrets, know-how, pricing, technology, software and all the information of a confidential nature disclosed (whether in writing, verbally or by any other means and whether directly or indirectly) whether before or after the date of this Agreement. Further, the Parties’ proprietary technology and software products, and the pricing and terms of this Agreement are Confidential Information of the Parties.</p>
  <p>For the purpose of this section the Party disclosing the Information shall be referred to as “Disclosing Party” and the Party receiving the Information shall be referred to as “Receiving Party”.</p>
  <p><span class="bold">6.</span> Each Party shall:</p>
  <p>(a) keep all Confidential Information of the other Party in strictest confidence and not disclose such Confidential Information to any third party without the written consent of the other Party;</p>
  <p>(b) use Confidential Information of the other Party only as expressly set forth herein or otherwise authorized in writing.</p>
  <p><span class="bold">7. Exceptions to Confidentiality.</span> Except with respect to Cardholder Information, the obligations set forth in, to the extent the Receiving Party establishes that:</p>
  <ul>
    <li>the Confidential Information disclosed to the Receiving Party was already known to the Receiving Party, without obligation to keep it confidential;</li>
    <li>the Receiving Party received the Confidential Information in good faith and without restriction from a third party lawfully in possession thereof without obligation to keep such Confidential Information confidential;</li>
    <li>the Confidential Information was publicly known at the time of its receipt by the Receiving Party or has become publicly known other than by a breach of this Agreement;</li>
    <li>the Confidential Information is independently developed by the Receiving Party without use of the other Party’s Confidential Information;</li>
    <li>the Confidential Information is disclosed by the Receiving Party with the prior written approval of the Disclosing Party; or</li>
    <li>the Confidential Information is required to be disclosed by Applicable Law or by judicial or administrative process;</li>
  </ul>
  <p>provided that (i) in the case of (a) through (f) above, such circumstances are demonstrated with written evidence thereof and (ii) in the case of (f) above, the Receiving Party will use reasonable efforts under the circumstances to notify the other Party of such requirements (unless prohibited by Applicable Law) and cooperate with such Party so as to provide such Party the opportunity to obtain a protective order or other relief. Further, in such a case the Receiving Party, to the extent possible, shall make the disclosures on terms which will preserve the strictest confidentiality of the Confidential Information.</p>
  <p><span class="bold">8.</span> Each Party shall maintain confidentiality, regarding the contents of this Agreement, information collected from the other Party, and the business and affairs of each Party. The Parties shall be permitted to disclose all aspects of the Agreement to their accountants, legal counsel and advisors provided such persons are under appropriate non-disclosure obligations imposed by professional ethics, law or contracts. Nothing contained herein shall affect the ability of the Parties to make disclosure under the Applicable Law or due to any Governmental Authority order.</p>
  <p><span class="bold">9.</span> It is agreed by the Merchant that it shall fully co-operate with Pay10 and/ or the Acquirer in respect of any issues arising out of a breach or potential breach of security in relation to the holding of confidential data, without prejudice to any right that Pay10/ Acquirer may have under law and equity.</p>
  <p><span class="bold">10.</span> The Merchant acknowledges that in the event of any breach or threatened breach of this section by the Merchant, monetary damages may not be an adequate remedy; therefore, Pay10 shall be entitled to injunctive relief to restrain the Merchant from any such breach, threatened or actual in addition to any other right that Pay10 might have under Law and Equity.</p>

  <h3>12. INDEMNITY</h3>
  <p><span class="bold">11. Indemnification.</span> Each Party hereby undertakes and agrees to indemnify, defend and hold harmless the other Party, its directors, officers, personnel, agents, representatives or independent contractors (collectively referred to as “Indemnified Parties”)and keep all of the Indemnified Parties at all times fully indemnified and held harmless from and against all damages, liabilities (which includes actions, suits, proceedings, investigations, complaints, claims, demands, orders, decrees, rulings, injunctions, judgments, directives, notices of violation, liabilities, liens, losses (including loss of value), damages, penalties, fines, settlements, costs, remediation costs, expenses and fees and as used in this Agreement, liabilities are not limited to matters asserted by third parties, but include liabilities incurred or sustained by Indemnified Parties hereto other than as a result of claims by third persons) and expenses (which includes any and all expenses (including attorneys’ fees and all other costs, expenses and obligations) incurred in connection with investigating, defending, being a witness in or participating in (including on appeal), or preparing to defend, to be a witness in or to participate in, any action, suit, proceeding, alternative dispute resolution mechanism, hearing, inquiry or investigation, whether formal or informal) however arising as a result of or in relation to:</p>
  <ul>
    <li>any breach or non-performance by a Party of any of its undertakings, representations, warranties, covenants, declarations or obligations under this Agreement; or</li>
    <li>any violation of Applicable Law by a Party, in performing its obligations under this Agreement except for violations of Applicable Law that may be cured; or</li>
    <li>any act, negligence, default or fraud by a Party, or its employees or representatives; or</li>
    <li>any claim or proceeding initiated by the Customer or any other person against the Indemnified Parties in respect of any services offered by the other Party; or</li>
    <li>any claim or proceeding initiated by a third party against the Indemnified Parties that the other Party’s Products infringe any intellectual or industrial property rights of that third party; or</li>
    <li>any claim by any other party against the Indemnified Parties arising from sub-Clause (a), (b) (c) or (d) above.</li>
  </ul>
  <p><span class="bold">2.</span> The indemnities provided herein shall survive the termination of this Agreement.</p>

  <h3>13. TERM AND TERMINATION</h3>
  <p><span class="bold">12.</span> This Agreement shall commence from the Effective Date and subject to the provisions of this Clause 14, shall continue to be in force unless terminated by either Party with 30 (thirty) days’ prior written notice to the other Party.</p>
  <p><span class="bold">13.</span> Either Party may terminate this Agreement with immediate effect if the other Party:</p>
  <ul>
    <li>becomes or is declared bankrupt or goes in liquidation (voluntary or compulsory), except for the purpose of amalgamation or reconstruction;</li>
    <li>ceases to carry on its business or suspends all or substantial part of its operations;</li>
    <li>engages in fraud or other illegal or unethical activities;</li>
    <li>commits any act or omit to commit any act, in violation or breach of any Applicable Law; or</li>
    <li>is in breach of, or fails to perform, any of its material obligations or any of the terms and conditions hereunder, and the defaulting Party is unable to rectify/cure such breach, in case of a curable breach, within 30 (Thirty) business days of being intimated of such default by the other Party. It is agreed that Pay10, at its sole discretion, may suspend the Services availed by the Merchant till such breach is rectified or cured by the Merchant, to the full satisfaction of Pay10.</li>
  </ul>
  <p><span class="bold">14.</span> This Agreement may be terminated with immediate effect, at the option of Pay10:-</p>
  <ul>
    <li>in case of excessive pending Chargebacks or high Chargeback or refund risk;</li>
    <li>If there is any material adverse change or any change in the Applicable Laws which prevents the continuing of the arrangement under this Agreement;</li>
    <li>If the Merchant is found to be misusing the payment link or using it for any illegal or malicious transactions;</li>
    <li>In the event of misuse of payment link by the Customer;</li>
    <li>if the Merchant's activities are, or are likely to have a material adverse impact on Pay10's business, commercial arrangements, reputation and/or goodwill;</li>
    <li>in case the Merchant fails to submit any transaction or no activity is recorded on its Terminal account, for a period of 6(six) consecutive months.</li>
  </ul>
  <p><span class="bold">15.</span> Termination of this Agreement shall not release any Party from the obligation to make payment of all amounts then due and/or payable. Upon termination, both Parties shall settle all outstanding amount payable to the other Party and arrange to return all the documents and properties of the other Party.</p>
  <p><span class="bold">14.5.</span> Termination of this Agreement shall neither affect any accrued rights or liabilities of either Party nor shall it affect the coming into force or the continuance in force of any provision of this Agreement which is expressly or by implication intended to come into or continue in force on or after such termination.</p>

  <h3>14. MISCELLANEOUS</h3>
  <p><span class="bold">1. Waiver; Severability:</span> No delay or failure of any Party hereto in exercising any right, privilege or option under this Agreement shall operate as a waiver of such or of any other right, privilege, or option. Waiver shall become binding only if agreed in writing between the Parties. If any provision of this Agreement is or becomes illegal or invalid under any Applicable Law, the validity of the remaining provisions shall not be affected thereby.</p>
  <p><span class="bold">2. Relationship:</span> The relationship between Pay10 and Merchant shall be purely on principal to principal basis Nothing herein shall be construed to create a partnership, joint venture, employment or agency relationship between the parties. Neither Party shall have any right, power or authority to bind or obligate the other Party in any manner to any third party.</p>
  <p><span class="bold">3. Assignment:</span> This Agreement shall bind and inure to the benefit of the respective successors and permitted assigns of each of the parties hereto; provided, however, that either Party shall not assign any of its rights or obligations hereunder without the other Party’s prior written consent. It is, however, agreed that Pay10 may assign any of its rights under this Agreement, as deemed necessary in the sole opinion of Pay10, to the Acquirer, which may include but not limited to:-</p>
  <p>(a) directly seek information and records from the Merchant</p>
  <p>(b) hold funds and/ or to make a direct claim for recovery of outstanding balances/ losses from the Merchant whether under this Agreement or under any other relationship that Acquirer may have with the Merchant.</p>
  <p>The Merchant shall intimate Pay10 in case of any change in line of Business related to this Agreement, change in constitution, change in control or change in management of the Merchant or cessation of business by the Merchant.</p>
  <p><span class="bold">4. Survival.</span> If this Agreement is terminated, then this Agreement shall become null and void and of no further force and effect, except that all confidentiality, indemnity, payment and all limitation of liability provisions contained in this Agreement shall survive and remain in full force and effect notwithstanding such termination and the payment of all amounts owed hereunder.</p>
  <p><span class="bold">5. Dispute Resolution.</span> All disputes, differences and/ or claims arising out of this Agreement whether during the subsistence or thereafter shall be settled amicably at the first instance, failing which the same shall be referred to Arbitration in accordance with the Arbitration and Conciliation Act, 1996 (including any statutory modification(s) or re-enactment thereof). The panel of three arbitrators shall be appointed wherein each party shall nominate one arbitrator and the third arbitrator shall be nominated mutually by the two appointed arbitrators. The seat and venue of arbitration proceedings shall be in New Delhi. The award of the arbitrator shall be final and conclusive and binding upon the Parties.</p>
  <p><span class="bold">6. Governing Law; Jurisdiction.</span> This Agreement and any non-contractual obligations arising out of or in connection with it are governed by the laws of India. The Parties agree that the courts of New Delhi, India shall have exclusive jurisdiction to settle any disputes in connection with this Agreement, and each Party submits to the jurisdiction of those courts.</p>
  <p><span class="bold">7. Notices:</span> All notices and other communication hereunder shall be in writing and shall be deemed given: (a) upon receipt if delivered personally or if mailed by registered post, return receipt requested and postage prepaid; or (b) three (3) days after dispatch, if sent by a courier; or (c) the day of delivery if sent by email unless the sender receives an automated message that the email has not been delivered. All notices shall be delivered to the following respective mailing and email addresses (or at such other address a Party may specify):</p>
  <p class="bold">If to Pay10:</p>
  <p>Attn: Legal Department</p>
  <p>Address: Pay10 Services Private Limited, 1st Floor, Building No.4, Ring Road, Lajpat Nagar - IV, South Delhi, Delhi, 110024</p>
  <p>E-mail: legal@pay10.in</p>
  <p class="bold">If to the Merchant:</p>
  <p>At the address provided by the Merchant in the onboarding process and captured in the Letter of Declaration</p>
  <p>Each party may change the, aforementioned, mailing addresses by giving 30 days prior notice of such a change to the other party.</p>
  <p><span class="bold">8. Entire Agreement; Amendments.</span> This Agreement and its corresponding Annexures embody the entire agreement between Pay10 and the Merchant relating to the subject matter and supersedes all prior agreements relating to the subject matter. This Agreement shall not be construed to confer any right, benefit, remedy or claim upon any person other than Merchant, and Pay10 (as express third party beneficiaries) and their successors and permitted assigns. Pay10 reserves the right to periodically update the terms of this Agreement and the updated terms of Agreement shall be notified to the Merchant by Pay10 through the appropriate mode of communication. By using the Pay10 services on or after receiving the notification of the updated terms, the Merchant acknowledges that the Merchant has read, understood and agreed to be bound by the revised terms of Agreement. It is clarified that all amendments and waivers to this Agreement must be in writing for the Parties to be bound by it.</p>
  <p><span class="bold">9. Force Majeure Event:</span> Neither Party shall be deemed to be in default of any of the obligations required to be performed by it under this Agreement to the extent that performance thereof is delayed, hindered or becomes impossible because of any act of God or public enemy, hostilities, war (declared or undeclared), sanctions, terrorist activities, act of sabotage, earthquake, flood, hurricane, storm, explosion, fire, labor disturbance, strike, riot, epidemic, pandemic, lockdown, act of government or its agencies or officers, power interruption or transmission failure, or any cause of a similar nature beyond the control of such Party.</p>
  <p><span class="bold">10. Further Assurance:</span> The Parties agrees to execute and deliver such additional documents and perform such actions as may be necessary or reasonably requested by Pay10 to carry out or evidence the transactions/services carried out or contemplated under this Agreement</p>

  <h3>ANNEXURE I-TERMS AND CONDITIONS</h3>
  <p class="bold">SERVICES AND SERVICE FEES</p>

  <table style="max-width: 980px; margin: 24px auto;">
    <colgroup>
      <col style="width: 75%;" />
      <col style="width: 25%;" />
    </colgroup>
    <tbody>
      <tr>
        <td>Setup cost (One Time Integration Charges)</td>
        <td class="bold">Waived Off</td>
      </tr>
      <tr>
        <td>AMC (Annual Maintenance Charge)</td>
        <td class="bold">Waived Off</td>
      </tr>
    </tbody>
  </table>

  <table>
    <colgroup>
      <col style="width: 70%;" />
      <col style="width: 30%;" />
    </colgroup>
    <thead>
      <tr>
        <th>Services</th>
        <th>Service Fees</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>UPI/ QR*</td>
        <td>0</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan="2" class="bold">
          *For UPI/ QR, the Service Fee comprises of Platform Fee only and no Transaction Discount Rate (TDR) is charged as per current regulations.
        </td>
      </tr>
      <tr>
        <td colspan="2">
          Fees do not include any applicable Goods and Services Tax (“GST”) and applicable cess/surcharge or any other similar indirect taxes in connection with the Services rendered, which will be over and above the Fees payable to Pay10.
        </td>
      </tr>
    </tbody>
  </table>
  <p>In the interest of promoting digital payments, Pay10 has agreed to provide a cash back at the rate of 2% of the transaction value, subject to a maximum limit of INR 100 per quarter. The cashback shall be payable by Pay10 within ten (10) business days from the end of the applicable quarter upon receiving an undisputed invoice from the Merchant.</p>

  <h3>ANNEXURE II - TERMS AND CONDITIONS</h3>
  <p class="bold">PROHIBITED OFFERINGS</p>
  <ul>
    <li>Any article or services which includes pornography and other sexually suggestive materials (including literature, imagery and other media); escort or prostitution services;</li>
    <li>Alcohol which includes alcohol or alcoholic beverages such as beer, liquor, wine, or champagne;</li>
    <li>Any article of service which would infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret or moral rights of any third party;</li>
    <li>Counterfeit and unauthorized goods which includes replicas or imitations of designer goods, fake autographs, counterfeit stamps, and other potentially unauthorized goods;</li>
    <li>Drugs and drug paraphernalia which includes illegal drugs and drug accessories, including herbal drugs like salvia and magic mushrooms;</li>
    <li>Endangered species which includes plants, animals or other organisms (including product derivatives) in danger of extinction;</li>
    <li>Gaming/gambling which includes lottery tickets, sports bets, memberships/ enrolment in online gambling sites, and related content;</li>
    <li>Government IDs or documents which includes fake IDs, passports, diplomas, and noble titles;</li>
    <li>Hacking and cracking materials which includes manuals, information, or equipment enabling illegal access to software, servers, website, or other protected property;</li>
    <li>Miracle cures which include unsubstantiated cures, remedies or other items marketed as quick health fixes;</li>
    <li>Offensive goods which include literature, products or other materials that: (a) defame or slander any person or groups of people based on race, ethnicity, national origin, religion, sex, or other factors; (b) encourage or incite violent acts; or (c) promote intolerance or hatred;</li>
    <li>Tobacco and cigarettes which includes cigarettes, cigars, chewing tobacco, and related products;</li>
    <li>Live animals or hides/skins/teeth, nails and other parts etc. of animals; and</li>
    <li>Any product or service which cannot be offered/ supplied in terms of the Applicable Laws.</li>
  </ul>

  <h3>ANNEXURE III - TERMS AND CONDITIONS</h3>
  <p class="bold">SETTLEMENT SCHEDULE</p>
  <p>Pay10 Escrow Bank shall remit the funds into the designated bank account of the Merchant no later than the first Business Day immediately following the date on which Pay10 issues, transmits, or otherwise provides its approval notice in respect of a payment request. Such remittance shall occur once per Business Day.</p>
  <p>For the avoidance of doubt, any transaction effected on a day that is not a Business Day, the corresponding remittance shall be made by Pay10 on the Business Day following such transaction.</p>
`;

const Page = () => {
  return (
    <main>
      <section className={Style.terms_and_condition_banner}>
        <div className={Style.wrapper} style={{ margin: 0 }}>
          <div>
            <h2>Terms and Conditions</h2>
          </div>
        </div>
      </section>

      <section className={Style.wrapper}>
        <div className={Style.terms_and_conditions_content}>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </section>
    </main>
  );
};

export default Page;

