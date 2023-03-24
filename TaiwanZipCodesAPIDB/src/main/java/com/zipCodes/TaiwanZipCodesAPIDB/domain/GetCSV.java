package com.zipCodes.TaiwanZipCodesAPIDB.domain;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.zipCodes.TaiwanZipCodesAPIDB.repository.ZipCodesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetCSV {
	
	private final ZipCodesRepository zipCodesRepository;
	
	@PostConstruct
	public void init() {
        String csvFile = "C:/Users/Roy/OneDrive/文件/5.SideProjects/TaiwanZipCodesAPIDB/src/main/resources/zipCode3revised.csv";
        String line = "";
        String csvSplitBy = ",";
        String[] data = null;
        List<ZipCodes> zipCodes = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {

            while ((line = br.readLine()) != null) {
            	
                data = line.split(csvSplitBy);
                
                ZipCodes zipCode = new ZipCodes();
                zipCode.setCity(data[0]);
                zipCode.setDistrict(data[1]);
                zipCode.setZipCode(Integer.valueOf(data[2]));
                zipCodes.add(zipCode);

            }
            
            zipCodesRepository.saveAll(zipCodes);

        } catch (IOException e) {
            e.printStackTrace();
        }
	}
}
