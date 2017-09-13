
<!-- TOC -->

- [Data Definition Statements](#data-definition-statements)
    - [create database](#create-database)
- [Data Manipulation Statements](#data-manipulation-statements)
    - [delete](#delete)
        - [修饰符](#修饰符)

<!-- /TOC -->

## Data Definition Statements

### create database

```sql
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
    [create_specification] ...


create_specification:
    [DEFAULT] CHARACTER SET [=] charset_name
 |  [DEFAULT] COLLATE [=] collation_name
```

- create schema和create database是同义的。
- [if not exists]()：如果指定该语句，那么当数据库已经存在时，不会报错，否者抛错

## Data Manipulation Statements

### delete

 ```sql
 DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM tbl_name
    [PARTITION (partition_name, ...)]
    [WHERE where_conditon]
    [ORDER BY ...]
    [LIMIT row_count]
 ```

删除表中记录，并返回删除的记录行数。

#### 修饰符

- `LOW_PRIORITY`：
- `QUICK`：
- `IGNORE`：该修饰符会让MySQL忽略删除记录时产生的错误error，只是返回警告warnings




