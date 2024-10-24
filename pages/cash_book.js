import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import HelpIcon from '@mui/icons-material/Help';

import { MySelect, MyTextInput, MyDatePickerNew, formatDate } from '@/ui/elements';

import queryString from 'query-string';

import dayjs from 'dayjs';

const text = {
  'virycka_fiz': 'Z-отчет о закрытия кассовой смены',
  'virycka_driver': 'Курьеры к сдаче',
  'zaim': 'Проставляется руководителем или бухгалтерией в случае внесения им займа в кассу кафе, если не хватает д/с в кассе, например, на выдачу з/платы.',
  'peremeshenie': 'Проставляется управляющим в случае, если у него не хватает д/с в кассе и он берет их из курьерской кассы',
  'zp': 'Заполняется бухгалтерией на основании платежных ведомостей на выплату з/пл, которые передаются управляющим на подпись. Управляющие в кассовой книге эти суммы лишь сверяет с полученными платежными ведомостями.',
  'incasacia': 'Сумма, сданная в банк. Проставляется управляющим в случае инкассации',
  'vozvrat': 'Проставляется руководителем или бухгалтерией в случае возврата из кассы ранее внесенного займа руководителем',
  'otchet_fiz': 'Проставляется управляющим с случае, если он взял из кассы денежные средства для покупки чего-либо и планирует отчитаться по авансовому отчету.',
  'otchet_driver': 'Эту сумму проставляет управляющий, которые по истечении месяца отчитывается перед руководителем куда потрачены и на какие цели эти денежные средства.'
};

class MainTable extends React.Component {
  render () {

    const kassa_text = this.props.table == 'fiz' ? 'Физические кассы' : 'Курьерская наличка';

    return (
      <TableContainer component={Paper}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan="3" style={{ textAlign: 'center' }}>{ kassa_text }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Тип</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff', textAlign: 'center' }}>Приход</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff', textAlign: 'center' }}>Расход</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            <TableRow>
              <TableCell>
                { this.props?.ostatok_nachalo_dnya_is_edit === false ?
                  <Typography 
                    component="span"
                  >
                    Остаток на начало дня
                  </Typography>
                    :
                  <Typography 
                    component="span"
                    onClick={this.props.addData.bind(this, 'ostatok_nachalo_dnya', this.props.table, this.props?.ostatok_nachalo_dnya_arr, kassa_text+': Остаток на начало дня')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Остаток на начало дня
                  </Typography>
                }
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}>{this.props?.ostatok_nachalo_dnya}</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                { this.props?.virycka_is_edit === false ?
                  <Typography 
                    component="span"
                  >
                    Выручка
                  </Typography>
                    :
                  <Typography 
                    component="span"
                    onClick={this.props.addData.bind(this, 'virycka', this.props.table, this.props?.virycka_arr, kassa_text+': Выручка')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Выручка
                    <Tooltip title={<Typography color="inherit">{ this.props.table == 'fiz' ? text.virycka_fiz : text.virycka_driver }</Typography>}> 
                      <IconButton>
                        <HelpIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                }
                
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}>{this.props?.virycka}</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                { this.props?.cash_from_bank_is_edit === false ?
                  <Typography 
                    component="span"
                  >
                    Снятие наличных в банке
                  </Typography>
                    :
                  <Typography 
                    component="span"
                    onClick={this.props.addData.bind(this, 'cash_from_bank', this.props.table, this.props?.cash_from_bank_arr, kassa_text+': Снятие наличных в банке')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Снятие наличных в банке
                  </Typography>
                }
                
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}>{this.props?.cash_from_bank}</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                { this.props?.zaim_is_edit === false ?
                  <Typography 
                    component="span"
                  >
                    Заемные средства
                  </Typography>
                    :
                  <Typography 
                    component="span"
                    onClick={this.props.addData.bind(this, 'zaim', this.props.table, this.props?.zaim_arr, kassa_text+': Заемные средства')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Заемные средства
                    <Tooltip title={<Typography color="inherit">{text.zaim}</Typography>}> 
                      <IconButton>
                        <HelpIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                }
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}>{this.props?.zaim}</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                { this.props?.dengi_iz_drygoy_kassy_is_edit === false ?
                  <Typography
                    component="span"
                  >
                    Перемещение из другой кассы
                  </Typography>
                    :
                  <Typography
                    component="span"
                    onClick={this.props.addData.bind(this, 'dengi_iz_drygoy_kassy', this.props.table, this.props?.dengi_iz_drygoy_kassy_arr, kassa_text+': Перемещение из другой кассы')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Перемещение из другой кассы
                    <Tooltip title={<Typography color="inherit">{text.peremeshenie}</Typography>}> 
                      <IconButton>
                        <HelpIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                }
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}>{this.props?.dengi_iz_drygoy_kassy_plus}</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}>{this.props?.dengi_iz_drygoy_kassy_minus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                { this.props?.vedomosm_zp_is_edit === false ?
                  <Typography
                    component="span"
                  >
                    Платежная ведомость на выплату заработной платы
                  </Typography>
                    :
                  <Typography
                    component="span"
                    onClick={this.props.addData.bind(this, 'vedomosm_zp', this.props.table, this.props?.vedomosm_zp_arr, kassa_text+': Платежная ведомость на выплату заработной платы')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Платежная ведомость на выплату заработной платы
                    <Tooltip title={<Typography color="inherit">{text.zp}</Typography>}> 
                      <IconButton>
                        <HelpIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                }
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}></TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}>{this.props?.vedomosm_zp}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                { this.props?.incasacia_is_edit === false ?
                  <Typography
                    component="span"
                  >
                    Инкассация
                  </Typography>
                    :
                  <Typography
                    component="span"
                    onClick={this.props.addData.bind(this, 'incasacia', this.props.table, this.props?.incasacia_arr, kassa_text+': Инкассация')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Инкассация
                    <Tooltip title={<Typography color="inherit">{text.incasacia}</Typography>}> 
                      <IconButton>
                        <HelpIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                }
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}></TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}>{this.props?.incasacia}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                { this.props?.vozvrat_zaim_is_edit === false ?
                  <Typography 
                    component="span"
                  >
                    Возврат займа
                  </Typography>
                    :
                  <Typography 
                    component="span"
                    onClick={this.props.addData.bind(this, 'vozvrat_zaim', this.props.table, this.props?.vozvrat_zaim_arr, kassa_text+': Возврат займа')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Возврат займа
                    <Tooltip title={<Typography color="inherit">{text.vozvrat}</Typography>}> 
                      <IconButton>
                        <HelpIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                }
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}></TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}>{this.props?.vozvrat_zaim}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                { this.props?.vidacha_otchet_is_edit === false ?
                  <Typography 
                    component="span"
                  >
                    Выдача в подотчет
                  </Typography>
                    :
                  <Typography 
                    component="span"
                    onClick={this.props.addData.bind(this, 'vidacha_otchet', this.props.table, this.props?.vidacha_otchet_arr, kassa_text+': Выдача в подотчет')} 
                    style={{ cursor: 'pointer', color: '#c03', padding: '15px 15px 15px 0px' }}
                  >
                    Выдача в подотчет
                    <Tooltip title={<Typography color="inherit">{ this.props.table == 'fiz' ? text.otchet_fiz : text.otchet_driver }</Typography>}> 
                      <IconButton>
                        <HelpIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                }
              </TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}></TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}>{this.props?.vidacha_otchet}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Итого за день</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}>{this.props?.itog_plus}</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}>{this.props?.itog_minus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Остаток на конец дня</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(3, 192, 60, 0.8)', color: '#fff' }}>{this.props?.ostatok_konec_dnya}</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(255, 3, 62, 1)', color: '#fff' }}></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

class CashBook_ extends React.Component {
  click = false;

  constructor(props) {
    super(props);
        
    this.state = {
      module: 'cash_book',
      module_name: '',
      is_load: false,
      
      points: [],
      point: '0',
      
      date_start: formatDate(new Date()),
      date_end: formatDate(new Date()),
      rangeDate: [formatDate(new Date()), formatDate(new Date())],

      modalDialog: false,

      drive_stat_full: [],
      drive_stat_date: null,
      summ: 0,
      choose_driver_id: 0,
      check_cash: 0,

      getSumm: 0,
      modalDialogGetSumm: false,
      getSummDriverId: null,
      getSummComment: '',

      modalDialogStatSumm: false,
      modalDialogStatSummMain: false,
      statSumm: [],
      statSummMain: [],

      show_dop: 0,

      fiz_kassa: {},
      driver_kassa: {},
      openModalType: '',
      openModalType_edit: false,
      comment: '',
      type: '',
      openModalKassa: '',
      openModalTitle: '',
      openModalHist_data: [],
    };
  }
  
  async componentDidMount(){
    
    let data = await this.getData('get_all');
    
    this.setState({
      points: data.points,
      point: data.points[0].id,
      module_name: data.module_info.name,
    })
    
    document.title = data.module_info.name;
    
    setTimeout( () => {
      this.updateData();
    }, 50 )
  }
  
  getData = (method, data = {}) => {
    
    this.setState({
      is_load: true
    })
    
    return fetch('https://jacochef.ru/api/index_new.php', {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        method: method, 
        module: this.state.module,
        version: 2,
        login: localStorage.getItem('token'),
        data: JSON.stringify( data )
      })
    }).then(res => res.json()).then(json => {
      
      if( json.st === false && json.type == 'redir' ){
        window.location.pathname = '/';
        return;
      }
      
      if( json.st === false && json.type == 'auth' ){
        window.location.pathname = '/auth';
        return;
      }
      
      setTimeout( () => {
        this.setState({
          is_load: false
        })
      }, 300 )
      
      return json;
    })
    .catch(err => { 
      console.log( err )
    });
  }
   
  async updateData(){
    let data = {
      point_id: this.state.point,
      date_start  : dayjs(this.state.date_start).format('YYYY-MM-DD'),
      date_end    : dayjs(this.state.date_end).format('YYYY-MM-DD'),
    };
    
    let res = await this.getData('get_data', data);
    
    console.log( res )
    
    this.setState({
      fiz_kassa: res.fiz_kassa,
      driver_kassa: res.driver_kassa,
    })
  }
  
  changeDate(data, event){
    this.setState({
      [data]: (event)
    })
  }

  changePoint(event){
    let data = event.target.value;
    
    this.setState({
      point: data
    })
  }

  giveCash(driver_id, check_cash){
    this.setState({
      modalDialog: true,
      choose_driver_id: driver_id,
      check_cash: check_cash
    })
  }

  changeSumm(event){
    this.setState({
      summ: event.target.value,
    })
  }

  changeComment(event){
    this.setState({
      comment: event.target.value,
    })
  }

  async saveGivePrice(){
    if( this.click ){
      return ;
    }

    this.click = true;

    if( parseInt( this.state.summ ) == 0 || this.state.comment.length == 0 ){
      alert('Необходимо указать сумму и комментарий');

      setTimeout( () => {
        this.click = false;
      }, 300 )

      return;
    }


    let data = {
      point_id: this.state.point,
      price: this.state.summ,
      comment: this.state.comment,
      type: this.state.openModalType,
      kassa: this.state.openModalKassa,
    };
    
    let res = await this.getData('save_give', data);

    if( res['st'] == true ){
      this.setState({
        modalDialog: false,
      })

      this.updateData();
    }else{
      alert(res['text'])
    }

    setTimeout( () => {
      this.click = false;
    }, 300 )
  }

  getCash(driver){
    this.setState({
      modalDialogGetSumm: true,
      getSumm: 0,
      getSummDriverId: driver,
      getSummComment: ''
    })
  }

  async saveGetPrice(){
    if( this.click ){
      return ;
    }

    this.click = true;

    if( parseInt( this.state.getSumm ) > 1000 ){
      alert('Нельзя выдать больше 1000р за раз');
      setTimeout( () => {
        this.click = false;
      }, 300 )
      return;
    }


    let data = {
      point_id: this.state.point,
      price: this.state.getSumm,
      driver_id: this.state.getSummDriverId.driver_id,
      comment: this.state.getSummComment
    };
    
    let res = await this.getData('save_get', data);

    console.log( res )

    if( res['st'] == true ){
      this.setState({
        modalDialogGetSumm: false,
        getSumm: 0,
        getSummDriverId: null,
        getSummComment: ''  
      })

      this.updateData();
    }else{
      alert(res['text'])
    }

    setTimeout( () => {
      this.click = false;
    }, 300 )
  }

  addData(type, kassa, hist, title){

    if( kassa == 'driver_cash' ){
      this.setState({
        openModalType: type,
        openModalType_edit: this.state.driver_kassa[ type+'_is_edit' ] == 'edit' ? true : false,
        openModalKassa: kassa,
        openModalTitle: title,
        openModalHist_data: hist,
  
        modalDialog: true,
        comment: '',
        summ: 0,
      })
    }else{
      this.setState({
        openModalType: type,
        openModalType_edit: this.state.fiz_kassa[ type+'_is_edit' ] == 'edit' ? true : false,
        openModalKassa: kassa,
        openModalTitle: title,
        openModalHist_data: hist,

        modalDialog: true,
        comment: '',
        summ: 0,
      })
    }

    //Остаток на начало дня - первый раз ставят директора

    //Выручка за день - отчет о закрытии смены
    //Заемные средства - директор или бухгалтерия
    //Перемещение из другой кассы - директор / менеджер

    //Выдача заработной платы - бухгалтерия
    //Инкассация - директор / менеджер
    //Возврат займа - директор или бухгалтерия
    //Выдача в подотчет - директор / менеджер
  }

  render(){
    return (
      <>
        <Backdrop style={{ zIndex: 99 }} open={this.state.is_load}>
          <CircularProgress color="inherit" />
        </Backdrop>
        
        <Dialog
          fullWidth={true}
          maxWidth={'md'}
          open={this.state.modalDialog}
          onClose={ () => { this.setState({ modalDialog: false, comment: '', openModalType: '', openModalKassa: '', summ: 0 }) } }
        >
          <DialogTitle>{this.state.openModalTitle}</DialogTitle>
          <DialogContent style={{ paddingBottom: 10, paddingTop: 10 }}>
            
            <Grid container spacing={3}>

              { this.state.openModalType_edit === false ? false :
                <Grid item xs={12} sm={12}>
                  <MyTextInput label="Сумма" value={this.state.summ} type={'number'} func={this.changeSumm.bind(this)} />
                </Grid>
              }

              { this.state.openModalType_edit === false ? false :
                <Grid item xs={12} sm={12}>
                  <MyTextInput label="Комментарий" value={this.state.comment} multiline={true} maxRows={3} type={'text'} func={this.changeComment.bind(this)} />
                </Grid>
              }

              <Grid item xs={12} sm={12}>
                <TableContainer component={Paper}>

                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Сотрудник</TableCell>
                        <TableCell>Время</TableCell>
                        <TableCell>Комментарий</TableCell>
                        <TableCell>Сумма</TableCell>
                        <TableCell>Наличка</TableCell>
                        <TableCell>Безнал</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {this.state.openModalHist_data?.map( item => 
                        
                        <TableRow key={item.id}>
                          <TableCell>{item.user_name}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.comment}</TableCell>
                          <TableCell>{item.summ}</TableCell>
                          <TableCell>{item.sum_cash}</TableCell>
                          <TableCell>{item.sum_bank}</TableCell>
                        </TableRow>

                      )}

                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

            </Grid>

            

          </DialogContent>
          { this.state.openModalType_edit === false ? false :
            <DialogActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button style={{ backgroundColor: 'green', color: '#fff' }} onClick={this.saveGivePrice.bind(this)}>Сохранить</Button>
              <Button style={{ backgroundColor: 'red', color: '#fff' }} onClick={() => { this.setState({ modalDialog: false, comment: '', openModalType: '', openModalKassa: '', summ: 0 }) }}>Отмена</Button>
            </DialogActions>
          }
        </Dialog>

        <Grid container spacing={3} style={{ paddingBottom: 100 }} className='container_first_child'>
          <Grid item xs={12} sm={12}>
            <h1>{this.state.module_name}</h1>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <MySelect data={this.state.points} value={this.state.point} func={ this.changePoint.bind(this) } label='Точка' />
          </Grid>

          <Grid item xs={12} sm={3}>
            <MyDatePickerNew label="Дата от" value={ this.state.date_start } func={ this.changeDate.bind(this, 'date_start') } />
          </Grid>
          <Grid item xs={12} sm={3}>
            <MyDatePickerNew label="Дата до" value={ this.state.date_end } func={ this.changeDate.bind(this, 'date_end') } />
          </Grid>

          
          <Grid item xs={12}>
            <Button variant="contained" onClick={this.updateData.bind(this)}>Обновить данные</Button>
          </Grid>
        
          <Grid item xs={12} sm={6}>
            <MainTable
              table={'fiz'}
              addData={this.addData.bind(this)}
              ostatok_nachalo_dnya={this.state.fiz_kassa?.ostatok_nachalo_dnya}
              ostatok_nachalo_dnya_is_edit={this.state.fiz_kassa?.ostatok_nachalo_dnya_is_edit}
              ostatok_nachalo_dnya_arr={this.state.fiz_kassa?.ostatok_nachalo_dnya_arr}
              
              virycka={this.state.fiz_kassa?.virycka}
              virycka_is_edit={this.state.fiz_kassa?.virycka_is_edit}
              virycka_arr={this.state.fiz_kassa?.virycka_arr}

              cash_from_bank={this.state.fiz_kassa?.cash_from_bank}
              cash_from_bank_is_edit={this.state.fiz_kassa?.cash_from_bank_is_edit}
              cash_from_bank_arr={this.state.fiz_kassa?.cash_from_bank_arr}

              

              zaim={this.state.fiz_kassa?.zaim}
              zaim_is_edit={this.state.fiz_kassa?.zaim_is_edit}
              zaim_arr={this.state.fiz_kassa?.zaim_arr}

              dengi_iz_drygoy_kassy_plus={this.state.fiz_kassa?.dengi_iz_drygoy_kassy_plus}
              dengi_iz_drygoy_kassy_minus={this.state.fiz_kassa?.dengi_iz_drygoy_kassy_minus}
              dengi_iz_drygoy_kassy_is_edit={this.state.fiz_kassa?.dengi_iz_drygoy_kassy_is_edit}
              dengi_iz_drygoy_kassy_arr={this.state.fiz_kassa?.dengi_iz_drygoy_kassy_arr}

              vedomosm_zp={this.state.fiz_kassa?.vedomosm_zp}
              vedomosm_zp_is_edit={this.state.fiz_kassa?.vedomosm_zp_is_edit}
              vedomosm_zp_arr={this.state.fiz_kassa?.vedomosm_zp_arr}

              incasacia={this.state.fiz_kassa?.incasacia}
              incasacia_is_edit={this.state.fiz_kassa?.incasacia_is_edit}
              incasacia_arr={this.state.fiz_kassa?.incasacia_arr}

              vozvrat_zaim={this.state.fiz_kassa?.vozvrat_zaim}
              vozvrat_zaim_is_edit={this.state.fiz_kassa?.vozvrat_zaim_is_edit}
              vozvrat_zaim_arr={this.state.fiz_kassa?.vozvrat_zaim_arr}

              vidacha_otchet={this.state.fiz_kassa?.vidacha_otchet}
              vidacha_otchet_is_edit={this.state.fiz_kassa?.vidacha_otchet_is_edit}
              vidacha_otchet_zp_arr={this.state.fiz_kassa?.vidacha_otchet_arr}

              itog_plus={this.state.fiz_kassa?.itog_plus}
              itog_minus={this.state.fiz_kassa?.itog_minus}
              ostatok_konec_dnya={this.state.fiz_kassa?.ostatok_konec_dnya}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MainTable 
              table={'driver_cash'}
              addData={this.addData.bind(this)}
              ostatok_nachalo_dnya={this.state.driver_kassa?.ostatok_nachalo_dnya}
              ostatok_nachalo_dnya_is_edit={this.state.driver_kassa?.ostatok_nachalo_dnya_is_edit}
              ostatok_nachalo_dnya_arr={this.state.driver_kassa?.ostatok_nachalo_dnya_arr}
              
              virycka={this.state.driver_kassa?.virycka}
              virycka_is_edit={this.state.driver_kassa?.virycka_is_edit}
              virycka_arr={this.state.driver_kassa?.virycka_arr}

              cash_from_bank={this.state.driver_kassa?.cash_from_bank}
              cash_from_bank_is_edit={this.state.driver_kassa?.cash_from_bank_is_edit}
              cash_from_bank_arr={this.state.driver_kassa?.cash_from_bank_arr}

              zaim={this.state.driver_kassa?.zaim}
              zaim_is_edit={this.state.driver_kassa?.zaim_is_edit}
              zaim_arr={this.state.driver_kassa?.zaim_arr}

              dengi_iz_drygoy_kassy_plus={this.state.driver_kassa?.dengi_iz_drygoy_kassy_plus}
              dengi_iz_drygoy_kassy_minus={this.state.driver_kassa?.dengi_iz_drygoy_kassy_minus}
              dengi_iz_drygoy_kassy_is_edit={this.state.driver_kassa?.dengi_iz_drygoy_kassy_is_edit}
              dengi_iz_drygoy_kassy_arr={this.state.driver_kassa?.dengi_iz_drygoy_kassy_arr}

              vedomosm_zp={this.state.driver_kassa?.vedomosm_zp}
              vedomosm_zp_is_edit={this.state.driver_kassa?.vedomosm_zp_is_edit}
              vedomosm_zp_arr={this.state.driver_kassa?.vedomosm_zp_arr}

              incasacia={this.state.driver_kassa?.incasacia}
              incasacia_is_edit={this.state.driver_kassa?.incasacia_is_edit}
              incasacia_arr={this.state.driver_kassa?.incasacia_arr}

              vozvrat_zaim={this.state.driver_kassa?.vozvrat_zaim}
              vozvrat_zaim_is_edit={this.state.driver_kassa?.vozvrat_zaim_is_edit}
              vozvrat_zaim_arr={this.state.driver_kassa?.vozvrat_zaim_arr}

              vidacha_otchet={this.state.driver_kassa?.vidacha_otchet}
              vidacha_otchet_is_edit={this.state.driver_kassa?.vidacha_otchet_is_edit}
              vidacha_otchet_zp_arr={this.state.driver_kassa?.vidacha_otchet_arr}

              itog_plus={this.state.driver_kassa?.itog_plus}
              itog_minus={this.state.driver_kassa?.itog_minus}
              ostatok_konec_dnya={this.state.driver_kassa?.ostatok_konec_dnya}
            />
          </Grid>

          

          
        </Grid>
      </>
    )
  }
}

export default function CashBook() {
  return (
    <CashBook_ />
  );
}
