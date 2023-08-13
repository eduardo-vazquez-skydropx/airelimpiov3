import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Pollutant from './Pollutant'
import Clinic from './Clinic'

export default class Ailment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relationships
  @manyToMany(()=> Clinic,{
    pivotTable:'aliment_clinics'
  })
  public clinics: ManyToMany<typeof Clinic>

  @manyToMany(()=> Pollutant,{
    pivotTable:'aliment_pollutants'
  })
  public pollutants: ManyToMany<typeof Pollutant>

}