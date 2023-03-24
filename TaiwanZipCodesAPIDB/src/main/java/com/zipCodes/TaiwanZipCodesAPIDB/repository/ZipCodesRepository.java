package com.zipCodes.TaiwanZipCodesAPIDB.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zipCodes.TaiwanZipCodesAPIDB.domain.ZipCodes;

public interface ZipCodesRepository extends JpaRepository<ZipCodes, Long> {

}
