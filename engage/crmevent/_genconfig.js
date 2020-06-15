'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Event",
	autoid: true,
	icon: "icon-crmevent-white.png",

	persistent: {
		'trn_crmevent' : {
			primarykeys: ['crmevent_id'],
			comment: 'CRM Event, suseuatu yang dilakukan untuk mencari calon customer baru',
			data: {
				crmevent_id: {text:'ID', type: dbtype.varchar(14), null:false},
				crmevent_name: {text:'Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Event harus diisi'}},
				crmevent_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				crmevent_dtstart: {text:'Start Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal mulai harus diisi'}},
				crmevent_dtend: {text:'End Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal selesai harus diisi'}},
				crmevent_dtaffected: {text:'Affected Until', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Batas Tanggal efektif harus diisi'}},
				crmevent_message: {text:'Message', type: dbtype.varchar(255), null:true, suppresslist: true},

				crmevent_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0'},
				crmevent_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				crmevent_isunlimit: {text:'Unlimit', type: dbtype.boolean, null:false, default:'0'},
				crmevent_isclose: {text:'Close', type: dbtype.boolean, null:false, default:'0'},

				crmevent_targetinvited: {text:'Target Invited', type: dbtype.decimal(8,0), null:false, default:'0',  suppresslist: true},
				crmevent_targetattendant: {text:'Target Attendant', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetnewcontact: {text:'Target New Contact', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targettx: {text:'Target Tx', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targettxnew: {text:'Target New Tx', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetbuyer: {text:'Target Buyer', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetbuyernew: {text:'Target Buyer New', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetsales: {text:'Target Sales', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true},
				crmevent_targetsalesnew: {text:'Target Sales New', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true},

				crmevent_totalinvited: {text:'Total Invited', type: dbtype.decimal(8,0), null:false, default:'0',  suppresslist: true, options:{readonly:true}},
				crmevent_totalattendant: {text:'Total Attendant', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true, options:{readonly:true}},
				crmevent_totalnewcontact: {text:'Total New Contact', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true, options:{readonly:true}},
				crmevent_totaltx: {text:'Tx', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true, options:{readonly:true}},
				crmevent_totaltxnew: {text:'New Tx', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true, options:{readonly:true}},
				crmevent_totalbuyer: {text:'Buyer', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true, options:{readonly:true}},
				crmevent_totalbuyernew: {text:'Buyer New', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true, options:{readonly:true}},
				crmevent_totalsales: {text:'Sales', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true, options:{readonly:true}},
				crmevent_totalsalesnew: {text:'Sales New', type: dbtype.varchar(8,0), null:false, default:'0', suppresslist: true, options:{readonly:true}},
				
				crmsource_id: {
					text:'Alokasi Source', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Alokasi Source harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_crmsource', 
						field_value: 'crmsource_id', field_display: 'crmsource_name', 
						api: 'crm/master/crmsource/list'})				
				},
			},

			defaultsearch : ['crmevent_id', 'crmevent_name'],

			uniques: {
				'crmevent_name' : ['crmevent_name']
			},

			values: [
				{crmevent_id:'MANUAL', crmevent_name:'MANUAL', crmevent_dtstart:'2020-01-01', crmevent_dtend:'2030-12-31', crmevent_isunlimit:'1'}
			],			
		},


		'trn_crmeventinvited' : {
			primarykeys: ['crmeventinvited_id'],
			comment: 'CRM Event Invited, yang diundang di event ini, baik yang sudah ada di contact atau belum. data ini sifatnya bulk.',
			data: {
				crmeventinvited_id: {text:'ID', type: dbtype.varchar(14), null:false},
				crmeventinvited_contact : {text:'Contact', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Contact harus diisi dengan no telpon / email'}},
				crmeventinvited_name : {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				crmeventinvited_address : {text:'Name', type: dbtype.varchar(255), null:false, uppercase: true, suppresslist: true},
				crmeventinvited_city : {text:'City', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true},

				crmeventinvited_iscontacted: {text:'Contacted', type: dbtype.boolean, null:false, default:'0', options:{readonly: true}},
				crmeventinvited_contactdate: {text:'Contact Date', type: dbtype.date, null:true, suppresslist: true, options:{readonly: true}},

				user_id: {
					text:'PIC', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'PIC harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'fgta_user', 
						field_value: 'user_id', field_display: 'user_fullname', 
						api: 'fgta/framework/user/list'})				
				},

				crmevent_id: {text:'Event', type: dbtype.varchar(14), null:false},
			}			
		},


		'trn_crmeventattendant' : {
			primarykeys: ['crmeventattendant_id'],
			comment: 'CRM Event Atendant, yang datang di event ini',
			readonly: true,
			data: {
				crmeventattendant_id: {text:'ID', type: dbtype.varchar(14), null:false},
				crmeventattendant_contact : {text:'Contact', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Contact harus diisi dengan no telpon / email'}},
				crmeventattendant_name : {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				crmeventattendant_address : {text:'Name', type: dbtype.varchar(255), null:false, uppercase: true},
				crmeventattendant_city : {text:'City', type: dbtype.varchar(30), null:false, uppercase: true},
				crmeventattendant_contactdate: {text:'Contact Date', type: dbtype.date, null:true, suppresslist: true, options:{readonly: true}},
				crmevent_id: {text:'Event', type: dbtype.varchar(14), null:false},
			}			
		},		

	},

	schema: {
		title: 'CRM Event',
		header: 'trn_crmevent',
		detils: {

			
		}
	}
}
